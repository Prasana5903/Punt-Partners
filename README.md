# Notepad Application

## Description

This is a Notepad application built using React. It allows users to:

- Select a font family and variant (weight + italic).
- Toggle italic style.
- Edit text with the selected font settings.
- Save and reset text and font settings.

The application dynamically loads fonts from a JSON file and applies them to the text editor based on user selections.

## Features

- **Font Selection:** Choose from a list of available fonts and their variants.
- **Italic Toggle:** Toggle italic style on or off.
- **Text Editor:** Edit and style text with the selected fonts.
- **Save and Reset:** Save the current text and font settings, or reset to default.
- **Dynamic Font Loading:** Fonts are loaded dynamically from a JSON file.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Prasana5903/Punt-Partners

```bash
  npm install
```
Create a fonts.json file in the public directory:

Add your fonts data in the public/fonts.json file. The JSON should be structured as follows:

```
{
  "Font Family 1": {
    "400": "https://fonts.example.com/400.woff2",
    "400italic": "https://fonts.example.com/400italic.woff2"
  },
  "Font Family 2": {
    "700": "https://fonts.example.com/700.woff2"
  }
}
```
3. Start the development server:

```bash
npm start
```
The application will be available at http://localhost:3000.
