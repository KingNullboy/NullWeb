<!DOCTYPE HTML>
<html>
	<head>
		<?php $title = "How to Make Alternate Websites - NullWiki"; include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
	</head>
	<body>
		<?php $navbarLogoRelPath = "../"; include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

		<main class="main-wrapper">
			<div class="wiki-container">

				<h1>How to Make Alternate Websites</h1>

				<p>
					This tutorial explains how to create alternate versions of websites using DNS tricks and domain redirection.
					It behaves like a proxy setup, but with more manual steps involved.
				</p>

				<h2>Step 1: Register on afraid.org</h2>
				<p>
					Go to <a href="https://freedns.afraid.org/" target="_blank" rel="noopener noreferrer">afraid.org</a>, create an account or log in.
					Then open the <a href="https://freedns.afraid.org/domain/registry" target="_blank" rel="noopener noreferrer">domain registry</a>.
				</p>

				<h2>Step 2: Find an Unblocked Domain</h2>
				<p>
					Scroll to the last page of the domain list. Use Ctrl+F and search for “public”.
					Copy a usable domain (example: <code>nylme.xyz</code>) and test it in a new tab.
				</p>

				<h2>Step 3: Find the Target Website IP</h2>
				<p>
					Use <a href="https://www.nslookup.io/website-to-ip-lookup/" target="_blank" rel="noopener noreferrer">NSLookup</a> or the dig command to extract the IPv4 address of your target website.
					Copy one of the IPs provided.
				</p>

				<h2>Step 4: Configure the Subdomain</h2>
				<p>
					Go back to afraid.org and paste the IP into the destination field.
					Choose a subdomain name (for example: <code>google</code>) and save the record.
				</p>

				<p>
					Wait for DNS propagation. After that, your alternate site should resolve through the new subdomain.
				</p>

			</div>
		</main>
	</body>
</html>