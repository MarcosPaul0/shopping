import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  minHeight: 656,
});

export const Product = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    button: {
      all: "unset",
      backgroundColor: "$green500",
      color: "$white",
      borderRadius: 8,
      padding: "0.75rem",
      cursor: "pointer",

      "&:hover": {
        backgroundColor: "$green300",
      },

      svg: {
        fontSize: "2rem",
      },
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
});

export const ItemInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "0.25rem",
  height: "100%",

  strong: {
    fontSize: "$lg",
    color: "$gray100",
  },

  span: {
    fontSize: "$xl",
    fontWeight: "bold",
    color: "$green300",
  },
});
