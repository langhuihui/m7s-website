import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function (req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const parts = url.pathname.split('/');
  res.end(`<!DOCTYPE html>
<html>

<head>
  <meta name="go-import" content="m7s.live/plugin/${parts[2]}/v4 git ssh://git@github.com/Monibuca/plugin-${parts[2]}">
  <meta name="go-source"
    content="m7s.live/plugin/${parts[2]}/v4 _ https://github.com/Monibuca/plugin-${parts[2]}/tree/v4{/dir} https://github.com/Monibuca/plugin-${parts[2]}/tree/v4{/dir}/{file}#L{line}">
  <meta http-equiv="refresh" content="0; url=https://pkg.go.dev/m7s.live/plugin/${parts[2]}/v4">
</head>

<body>
  Nothing to see here. Please <a href="https://pkg.go.dev/m7s.live/plugin/${parts[2]}/v4">move along</a>.
</body>

</html>
  `);
}
