# Rei's Voyage to Three

A free, mobile-friendly, island-inspired birthday invitation website for Rei's 3rd birthday.

## Party details already included

- **Date:** Sunday, August 30, 2026
- **Time:** 10:30 AM–12:30 PM
- **Location:** Charlestown Township Park, Pavilion #3
- **RSVP deadline:** August 20, 2026
- **Theme:** Rei's Voyage to Three

## 1. Upload these files to GitHub

Upload everything in this folder to the root of your GitHub repository:

- `index.html`
- `styles.css`
- `script.js`
- `assets/rei-photo.jpg` (later)
- `.nojekyll`

## 2. Turn on GitHub Pages

1. Open your repository.
2. Select **Settings**.
3. Select **Pages** in the left menu.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`.
6. Select **Save**.
7. GitHub will show your free website URL after deployment.

## 3. Add the Google Form

Create a form with these questions:

1. Guest name
2. Will you attend?
3. Number of adults
4. Number of children
5. Food allergies or notes

Then:

1. Open the form.
2. Select **Send**.
3. Choose the link icon.
4. Copy the link.
5. Open `script.js`.
6. Paste the URL between the quotes for `GOOGLE_FORM_URL`.

Example:

```js
const GOOGLE_FORM_URL = "https://forms.gle/example";
```

## 4. Add your text number

Open `script.js` and update:

```js
const TEXT_MESSAGE_URL = "sms:+16105551234";
```

Use `+1` followed by the full U.S. phone number, with no spaces or dashes.

## 5. Add the Amazon Wishlist

Open `script.js` and update:

```js
const AMAZON_WISHLIST_URL = "https://www.amazon.com/hz/wishlist/ls/example";
```

## 6. Add Rei's photo

Save the chosen photo as:

```text
assets/rei-photo.jpg
```

For best results, use a square or portrait-oriented photo. The site automatically crops it to fit.

## 7. Create a QR code for free

Once GitHub Pages gives you the website URL, use Chrome:

1. Open the website.
2. Right-click the page.
3. Select **Create QR code for this page**.
4. Save the QR code image.

You can add that image to printed or text-message invitations.

## Privacy note

Because GitHub Pages is public, avoid posting private information you do not want publicly searchable. A phone number placed in `script.js` can be viewed by anyone visiting the website. You can use only the Google Form instead, or use a Google Voice number.

## Copyright note

The design uses an original tropical-island theme. It does not contain Disney or Moana artwork, logos, music, or characters.
