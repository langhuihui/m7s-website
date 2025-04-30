# Task Mechanism

The task mechanism permeates the entire project, defined in the /pkg/task directory. When designing any logic, you must first consider implementing it using the task mechanism, which ensures observability and panic capture, among other benefits.

## Concept Definitions

### Inheritance

In the task mechanism, all tasks are implemented through inheritance.
While Go doesn't have inheritance, it can be achieved through embedding.

### Macro Task

A macro task, also called a parent task, can contain multiple child tasks and is itself a task.

### Child Task Goroutine

Each macro task starts a goroutine to execute the Start, Run, and Dispose methods of child tasks. Therefore, child tasks sharing the same parent task can avoid concurrent execution issues. This goroutine might not be created immediately, implementing lazy loading.

## Task Definition

Tasks are typically defined by inheriting from `task.Task`, `task.Job`, `task.Work`, `task.ChannelTask`, or `task.TickTask`.
For example:
```go
type MyTask struct {
    task.Task
}
```
- `task.Task` is the base class for all tasks, defining basic task properties and methods.
- `task.Job` can contain child tasks and ends when all child tasks complete.
- `task.Work` similar to Job, but continues executing after child tasks complete.
- `task.ChannelTask` custom signal task, implemented by overriding the `GetSignal` method.
- `task.TickTask` timer task, inherits from `task.ChannelTask`, controls timer interval by overriding `GetTickInterval` method.

### Defining Task Start Method

Implement task startup by defining a Start() error method.

The returned error indicates whether the task started successfully. Nil indicates successful startup, otherwise indicates startup failure (special case: returning Complete indicates task completion).

Start typically includes resource creation, such as opening files, establishing network connections, etc.

The Start method is optional; if not defined, startup is considered successful by default.

### Defining Task Execution Process

Implement task execution process by defining a Run() error method.

This method typically executes time-consuming operations and blocks the parent task's child task goroutine.

There's also a non-blocking way to run time-consuming operations by defining a Go() error method.

A nil error return indicates successful execution, otherwise indicates execution failure (special case: returning Complete indicates task completion).

Run and Go are optional; if not defined, the task remains in running state.

### Defining Task Destruction Process

Implement task destruction process by defining a Dispose() method.

This method typically releases resources, such as closing files, network connections, etc.

The Dispose method is optional; if not defined, no action is taken when the task ends.

## Hook Mechanism

Implement hooks through OnStart, OnBeforeDispose, and OnDispose methods.

## Waiting for Task Start and End

Implement waiting for task start and end through WaitStarted() and WaitStopped() methods. This approach blocks the current goroutine.

## Retry Mechanism

Implement retry mechanism by setting Task's RetryCount and RetryInterval. There's a setting method, SetRetry(maxRetry int, retryInterval time.Duration).

### Trigger Conditions

- When Start fails, it retries calling Start until successful.
- When Run or Go fails, it calls Dispose to release resources before calling Start to begin the retry process.

### Termination Conditions

- Retries stop when the retry count is exhausted.
- Retries stop when Start, Run, or Go returns ErrStopByUser, ErrExit, or ErrTaskComplete.

## Starting a Task

Start a task by calling the parent task's AddTask method. Don't directly call a task's Start method. Start must be called by the parent task.

## Task Stopping

Implement task stopping through the Stop(err error) method. err cannot be nil. Don't override the Stop method when defining tasks.

## Task Stop Reason

Check task stop reason by calling the StopReason() method.

## Call Method

Calling a Job's Call method creates a temporary task to execute a function in the child task goroutine, typically used to access resources like maps that need protection from concurrent read/write. Since this function runs in the child task goroutine, it cannot call WaitStarted, WaitStopped, or other goroutine-blocking logic, as this would cause deadlock. 