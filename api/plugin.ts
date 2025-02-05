import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const [, , pluginName, version] = url.pathname.split('/');
  res.end(`<!DOCTYPE html>
<html>

<head>
  <meta name="go-import" content="m7s.live/plugin/${pluginName}/${version} git https://github.com/Monibuca/plugin-${pluginName}">
  <meta name="go-source"
    content="m7s.live/plugin/${pluginName}/${version} _ https://github.com/Monibuca/plugin-${pluginName}/tree/${version}{/dir} https://github.com/Monibuca/plugin-${pluginName}/tree/${version}{/dir}/{file}#L{line}">
  <meta http-equiv="refresh" content="0; url=https://pkg.go.dev/m7s.live/plugin/${pluginName}/${version}">
</head>

<body>
  Nothing to see here. Please <a href="https://pkg.go.dev/m7s.live/plugin/${pluginName}/${version}">move along</a>.
</body>

</html>
  `);
}
