module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const buttons = {
        ".buttons": {
          font: "inherit",
          padding: "0.5rem 1.5rem",
          border: "1px solid #ff0055",
          borderRadius: "4px",
          background: "#ff0055",
          color: "white",
          cursor: "pointer",
          marginRight: "1rem",
          textDecoration: "none",
          display: "inline-block",
        },
        ".btn-red": {
          padding: ".5rem 1rem",
          borderRadius: ".25rem",
          fontWeight: "600",
          backgroundColor: "#e3342f",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#cc1f1a",
          },
        },
      };

      addComponents(buttons);
    }),
  ],
};
