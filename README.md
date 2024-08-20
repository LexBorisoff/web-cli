<h1 align="center">Web CLI</h1>

CLI for making browser search queries.

# Documentation

Read full documentation [here](https://github.com/LexBorisoff/web-cli/tree/main#readme).

# Installation

Install the package globally:

<pre><code>npm i <em>-g</em> @lexjs/web-cli</code></pre>

After installing, the `web` command is ready for use without any setup.

<pre><code>web hello world</code></pre>

&gt; `https://google.com/search?q=hello%20world`

<pre><code>web Array.prototype.at <em>--mdn</em></code></pre>

&gt; `https://developer.mozilla.org/search?q=String.prototype.at`

<pre><code>web typescript tutorial <em>--youtube</em></code></pre>

&gt; `https://youtube.com/results?search_query=typescript+tutorial`

> 📗 Read [full documentation](https://github.com/LexBorisoff/web-cli/tree/main#readme) to learn more.

To get help with command options, use the `--help` option:

<pre><code>web <em>--help</em></code></pre>

To check the installed version, use the `--version` option:

<pre><code>web <em>--version</em></code></pre>
