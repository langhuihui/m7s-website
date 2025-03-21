# Preview
Preview is an important feature in Monibuca that allows users to quickly view video stream status and content.

## Feature Highlights
- Provides `/preview` page for testing players with different protocols

## Usage Examples
### Testing Playback Using Preview Page
The Preview plugin provides a built-in preview page accessible via the `/preview` path:

1. Start the Monibuca server and ensure the Preview plugin is enabled
2. Open a browser and visit `http://your-server-address:8080/preview`
3. On the preview page, you can:
   - Select different playback protocols (such as RTMP, HLS, WebRTC, etc.)
   - Enter stream name for test playback
   - View corresponding protocol playback URLs
   - Preview video stream content in real-time
   - Adjust playback parameters

The preview page simultaneously displays playback URLs for various protocols, making it convenient to copy and share with other users or devices for testing.

## Important Notes
1. Set reasonable preview duration
2. Pay attention to bandwidth usage
3. Monitor system resources
4. Clean up preview data promptly
5. Control concurrent numbers

## Common Issues
1. Preview Failure
   - Check stream status
   - Verify configuration correctness
   - Confirm sufficient resources
   - Check browser console error messages:
     - Press F12 or right-click and select "Inspect" to open developer tools on the preview page
     - Switch to the "Console" tab to view red error messages
     - Common errors include: player loading failure, network connection issues, CORS policy restrictions, etc.
   - Check server logs:
     - Review Monibuca server logs, typically in console or log files
     - Focus on streaming-related error messages, such as stream not existing, format incompatibility, etc.
     - Check network connection and protocol conversion related warnings or errors

2. Performance Issues
   - Optimize preview parameters
   - Control concurrent numbers
   - Monitor system load

3. Storage Issues
   - Check storage space
   - Clean up expired data
   - Optimize storage strategy 