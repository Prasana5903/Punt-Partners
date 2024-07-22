import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [fonts, setFonts] = useState({});
  const [fontFamily, setFontFamily] = useState('');
  const [variant, setVariant] = useState('');
  const [italic, setItalic] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    // Fetch fonts.json from the public directory
    fetch('/fonts.json')
      .then(response => response.json())
      .then(data => {
        setFonts(data);
        setFontFamily(Object.keys(data)[0]); // Set default font family
        setVariant(Object.keys(data[Object.keys(data)[0]])[0]); // Set default variant
      });

    // Load saved state from localStorage
    const savedText = localStorage.getItem('text');
    const savedFontFamily = localStorage.getItem('fontFamily');
    const savedVariant = localStorage.getItem('variant');
    const savedItalic = localStorage.getItem('italic') === 'true';

    if (savedText) setText(savedText);
    if (savedFontFamily) setFontFamily(savedFontFamily);
    if (savedVariant) setVariant(savedVariant);
    if (savedItalic !== null) setItalic(savedItalic);
  }, []);

  useEffect(() => {
    // Generate @font-face rules dynamically
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';

    const fontFaces = Object.keys(fonts).map(font => {
      const variants = fonts[font];
      return Object.keys(variants).map(variant => {
        const isItalic = variant.includes('italic');
        return `
          @font-face {
            font-family: '${font}';
            font-weight: ${isItalic ? 'normal' : variant};
            font-style: ${isItalic ? 'italic' : 'normal'};
            src: url('${variants[variant]}') format('woff2');
          }
        `;
      }).join(' ');
    }).join(' ');

    styleSheet.textContent = fontFaces;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [fonts]);

  const handleSave = () => {
    localStorage.setItem('text', text);
    localStorage.setItem('fontFamily', fontFamily);
    localStorage.setItem('variant', variant);
    localStorage.setItem('italic', italic.toString());
  };

  const handleReset = () => {
    setText('');
    setFontFamily(Object.keys(fonts)[0]);
    setVariant(Object.keys(fonts[Object.keys(fonts)[0]])[0]);
    setItalic(false);
  };

  return (
    <div className="App">
      <div className='heading'>Punt Partners Front End</div>
      <div className="controls">
        <label>
          Font Family
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            {Object.keys(fonts).map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </label>
        <label>
          Variant
          <select value={variant} onChange={(e) => setVariant(e.target.value)}>
            {fonts[fontFamily] && Object.keys(fonts[fontFamily]).map(variant => (
              <option key={variant} value={variant}>
                {variant.includes('italic') ? 'Italic' : `Weight ${variant}`}
              </option>
            ))}
          </select>
        </label>
        <label id="italic-label">
          Italic
          <input
            type="checkbox"
            id="switch"
            className="switch"
            checked={italic}
            onChange={() => setItalic(!italic)}
            disabled={!fonts[fontFamily] || !Object.keys(fonts[fontFamily]).some(v => v.includes('italic'))}
          />
          <label htmlFor="switch" className="toggle-switch"></label>
        </label>
      </div>
      <textarea
        className="text-editor"
        style={{
          fontFamily: fontFamily,
          fontWeight: variant.includes('italic') ? 'normal' : variant,
          fontStyle: italic ? 'italic' : 'normal'
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="buttons">
        <button onClick={handleReset}>Reset</button>
        <button ocClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default App;
