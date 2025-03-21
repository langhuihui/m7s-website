# 任务机制

任务机制贯穿整个项目，在/pkg/task 目录下定义。任何逻辑在设计时，必须先考虑使用任务机制来实现，这样可以保证被观测，也可以捕获 panic 等等。

## 概念定义

### 继承

任务机制中，所有任务都是通过继承来实现的。
go语言没有继承，但可以通过嵌入来实现。

### 宏任务

宏任务又叫父任务，可以包含多个子任务的执行，本身也是一个任务。

### 子任务协程

每一个宏任务都会启动一个协程，用来执行子任务的 Start、 Run、 Dispose 方法。因此，拥有同一个父任务的子任务，可以避免并发执行问题。这个协程可能不会一开始就创建，也就是可能会是懒加载。

## 任务的定义

任务通常通过继承 `task.Task` 、`task.Job` 、`task.Work` 、`task.ChannelTask` 、 `task.TickTask` 来定义。
例如：
```go
type MyTask struct {
	task.Task
}
```
- `task.Task` 是所有任务的基类，定义了任务的基本属性和方法。
- `task.Job` 可包含子任务，子任务全部结束后，Job 会结束。
- `task.Work` 同 Job,但子任务结束后，Work 会继续执行。
- `task.ChannelTask` 自定义信号的任务，通过 覆盖 `GetSignal` 方法来实现。
- `task.TickTask` 定时任务，继承自 `task.ChannelTask` ，通过 覆盖 `GetTickInterval` 方法来控制定时器间隔。

### 定义任务启动方法

通过定义一个方法 Start() error 来实现任务的启动。

其中返回的 error 可以用来判断任务是否启动成功。如果为空则代表任务成功启动了。否则代表启动失败（特殊情况，返回 Complete 代表任务完成）。

通常在 Start 中包含资源的创建，例如打开文件，建立网络连接等。

Start 方法是可选的，如果没有定义，则默认启动成功。

### 定义任务的执行过程

通过定义一个方法 Run() error 来实现任务的执行过程。

这个方法通常用来执行耗时操作，同时会阻塞父任务的子任务协程。

还有一个非阻塞的方式来运行耗时操作，就是定义 Go() error 方法。

error 返回的值如果是 nil 则代表任务执行成功，否则代表执行失败（特殊情况，返回 Complete 代表任务完成）。

Run 和 Go 也是可选的，如果不定义则任务会处于正在运行状态。

### 定义任务的销毁过程

通过定义一个方法 Dispose() 来实现任务的销毁过程。

这个方法通常用来释放资源，例如关闭文件，关闭网络连接等。

Dispose 方法也是可选的，如果没有定义，则任务结束不做任何操作。

## 钩子机制

通过 OnStart、OnBeforeDispose、OnDispose 方法来实现钩子机制。

## 等待任务开始和结束

通过 WaitStarted() 和 WaitStopped() 方法来实现等待任务开始和结束。这种方式会阻塞当前协程。

## 重试机制

通过设置 Task 的 RetryCount 和 RetryInterval 来实现重试机制。有一个设置方法，SetRetry(maxRetry int, retryInterval time.Duration)。

### 触发条件

- 当 Start 失败时，会重试调用 Start 直到成功。

- 当 Run 或者 Go 失败时，则会先调用 Dispose 释放资源后再调用 Start 开启重试流程。

### 终止条件

- 当重试次数满了之后就不再重试了。
- 当 Start 或者 Run、Go 返回 ErrStopByUser 、 ErrExit 、ErrTaskComplete 时，则终止重试。


## 启动一个任务

通过调用父任务的 AddTask 方法来启动一个任务。 不可以直接主动调用任务的 Start 方法。Start 方法必须是被父任务调用。

## 任务的停止

通过调用 Stop(err error) 方法来实现任务的停止。err 不能传入 nil。定义任务时不要覆盖 Stop 方法。

## 任务的停止原因

通过调用 StopReason() 方法可以检查任务的停止原因。

## Call 方法

调用 Job 的 Call 会创建一个临时任务，用来在子任务协程中执行一个函数，通常用来访问 map 等需要防止并发读写的资源。由于该函数会在子任务协程中运行，因此不可以调用 WaitStarted 和 WaitStopped 以及其他阻塞协程的逻辑，否则会导致死锁。

