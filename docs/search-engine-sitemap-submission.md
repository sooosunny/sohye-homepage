# Sitemap and Search Engine Registration Guide

## Current sitemap setup

The Sohye Bae homepage uses the following production domain:

```text
https://dr-sohye.shop
```

The sitemap is published at:

```text
https://dr-sohye.shop/sitemap.xml
```

The robots file is published at:

```text
https://dr-sohye.shop/robots.txt
```

`robots.txt` includes this sitemap declaration:

```text
Sitemap: https://dr-sohye.shop/sitemap.xml
```

This lets compliant crawlers discover the sitemap automatically.

## What was applied

- Created `public/sitemap.xml`.
- Created `public/robots.txt`.
- Updated the site canonical URL to `https://dr-sohye.shop`.
- Deployed the generated static files to AWS.
- Confirmed that `sitemap.xml` contains 11 URLs.
- Confirmed that `robots.txt` references `https://dr-sohye.shop/sitemap.xml`.
- Pushed the changes to GitHub.

Latest related commit:

```text
1dd2dd1 Add sitemap and robots for Sohye domain
```

## Sitemap URL to submit

Use this exact URL for Google Search Console and Naver Search Advisor:

```text
https://dr-sohye.shop/sitemap.xml
```

## Google registration

Google no longer supports the old public sitemap ping endpoint. The practical options are:

1. Let Google discover the sitemap from `robots.txt`.
2. Submit the sitemap manually in Google Search Console.
3. Use the Google Search Console API, if API access and site ownership are already configured.

Recommended manual steps:

1. Open Google Search Console:

   ```text
   https://search.google.com/search-console
   ```

2. Add or select the property for:

   ```text
   https://dr-sohye.shop
   ```

3. Verify site ownership if Google asks for it.

   Common verification methods:

   - DNS TXT record
   - HTML file upload
   - HTML meta tag
   - Google Analytics
   - Google Tag Manager

4. In the left menu, open:

   ```text
   Sitemaps
   ```

5. Enter:

   ```text
   sitemap.xml
   ```

   or the full URL:

   ```text
   https://dr-sohye.shop/sitemap.xml
   ```

6. Click Submit.

7. After submission, check whether Google reports:

   - sitemap fetched successfully
   - discovered URLs
   - parsing errors, if any

## Naver registration

Naver sitemap submission requires Naver Search Advisor login and site ownership verification.

Recommended manual steps:

1. Open Naver Search Advisor:

   ```text
   https://searchadvisor.naver.com
   ```

2. Log in with the Naver account that will manage the site.

3. Add the site:

   ```text
   https://dr-sohye.shop
   ```

4. Verify site ownership.

   Common verification methods:

   - HTML file upload
   - HTML meta tag

5. After ownership verification, open the site management dashboard.

6. Go to sitemap submission.

   Korean UI labels may appear as:

   ```text
   요청 > 사이트맵 제출
   ```

   or:

   ```text
   사이트맵 제출
   ```

7. Submit:

   ```text
   https://dr-sohye.shop/sitemap.xml
   ```

8. Check the result in Naver Search Advisor.

   Review:

   - collection status
   - robots.txt status
   - sitemap parsing status
   - crawl errors

## Verification commands

From a terminal, the sitemap can be checked with:

```bash
curl -L https://dr-sohye.shop/sitemap.xml
```

The number of URLs can be checked with:

```bash
curl -L https://dr-sohye.shop/sitemap.xml | grep -c '<loc>'
```

The robots sitemap line can be checked with:

```bash
curl -L https://dr-sohye.shop/robots.txt
```

Expected results:

```text
sitemap.xml: 11 <loc> entries
robots.txt: Sitemap: https://dr-sohye.shop/sitemap.xml
```

## Notes

- Sitemap submission does not guarantee indexing.
- Google and Naver may take time to crawl and process the sitemap.
- If DNS is unstable locally, retry after a few minutes or check from another network.
- If the sitemap changes later, rebuild and redeploy the site, then resubmit or request recrawl in the search console.
