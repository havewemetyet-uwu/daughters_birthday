# Automatic Amazon Wishlist Sync

This site includes a GitHub Actions workflow that checks Rei's public Amazon wishlist every four hours.

## How it works

- `wishlist-status.json` stores the saved status for each Amazon ASIN.
- `.github/workflows/sync-wishlist.yml` runs automatically every four hours and can also be run manually from the Actions tab.
- `scripts/sync-wishlist.mjs` opens the public wishlist with Playwright and records which configured ASINs are still visible.
- An item must be missing from **two consecutive successful checks** before it is marked `gifted`.
- If Amazon returns a CAPTCHA, bot-check, error page, or suspiciously incomplete list, the sync fails safely and leaves the previous status unchanged.
- `wishlist-status.js` reads the saved JSON on the GitHub Pages site. Gifted items stay visible but receive an **Already gifted** treatment and their Amazon button is hidden.

## First use

After uploading these files to the repository, open **GitHub → Actions → Sync Amazon Wishlist → Run workflow** to test it immediately. Scheduled runs happen every four hours after that.

## Important limitation

Amazon does not provide this site with an official wishlist-purchase API. The automation infers that an item is gifted when it disappears from the anonymously visible public wishlist. If an item is manually removed from Amazon, the site will eventually treat it the same way. Amazon can also change or block its public page structure, in which case the workflow is designed to fail without changing any statuses.
