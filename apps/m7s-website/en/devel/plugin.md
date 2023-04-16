# Plugin Definition

- Plugins are a standard way to extend m7s.
- Plugins can include the parsing of audio and video protocols or other business logic.

## Standard Writing

The following is the simplest code for defining and installing a plugin, and this plugin has no effect. (The name of the plugin is "MyPlugin")
The plugin definition must include an `OnEvent` method to receive all plugin events, including events on the event bus.
```go
import . "m7s.live/engine/v4"
type MyPluginConfig struct {
  // Define the plugin's configuration
  ABC int
}
func (p *MyPluginConfig) OnEvent(event any) {
  switch event.(type) {
    case FirstConfig: // Plugin initialization logic
    case Config:// Plugin hot update logic
    case *Stream://On-demand pull stream logic
    case SEwaitPublish:// Wait for publisher to come online
    case SEpublish:// First enter publishing status
    case SErepublish:// Enter publishing status again
    case SEsubscribe:// Subscriber logic
    case SEwaitClose:// Wait for the last subscriber to leave and close the stream
    case SEclose:// Close stream
    case UnsubscribeEvent:// Subscriber leaves
    case ISubscribe:// Subscriber enters
  }
}
var plugin = InstallPlugin(new(MyPluginConfig))
```

## Plugin Configuration

```yaml
myplugin:
  abc: 123
```
After the user configures the plugin configuration, the engine automatically parses and assigns values to the plugin's configuration.

## Predefined Configuration Plugins

```go
import 	"m7s.live/engine/v4/config"
type MyPluginConfig struct {
  config.HTTP
  config.Publish
  config.Pull
  config.Subscribe
  config.Push
}
```
You can choose one or more pre-defined structure to define the plugin's configuration, which makes the plugin have specific abilities.
These configuration items can override global configuration.

:::warning Mandatory
If the plugin needs to implement the publisher's ability, it must add the `config.Publish` configuration structure, because the publisher's configuration information will be automatically read when registering the publishing stream.
:::