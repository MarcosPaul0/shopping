import { styled } from "@stitches/react";

export const CartSidebarContainer = styled("div", {
  display: "flex",
  position: "fixed",
  minHeight: "100vh",
  maxHeight: "100vh",
  background: "$gray800",
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",
  flexDirection: "column",
  right: 0,
  top: 0,
  overflow: "hidden",
  transition: "all 0.2s",
  padding: "3rem 0",
  width: "0",
  variants: {
    isOpen: {
      true: {
        width: "30rem",
        padding: "3rem",
      },
    },
  },

  h1: {
    fontWeight: "bold",
    fontSize: "$lg",
    color: "$gray100",
    lineHeight: "160%",
    whiteSpace: "nowrap",
  },

  ul: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
});

export const CloseButton = styled("button", {
  all: "unset",
  color: "$gray300",
  fontSize: "1.5rem",
  alignSelf: "flex-end",
  cursor: "pointer",
});

export const CartInfoContainer = styled("div", {
  width: "100%",
  marginTop: "auto",
  marginBottom: "3.4rem",

  span: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "$md",
    color: "$gray300",
    lineHeight: "160%",
    whiteSpace: "nowrap",

    span: {
      fontSize: "$lg",
      lineHeight: "160%",
      whiteSpace: "nowrap",
    },
  },

  strong: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "$lg",
    color: "$gray100",
    fontWeight: "bold",
    lineHeight: "160%",
    whiteSpace: "nowrap",

    span: {
      fontSize: "$xl",
      color: "$gray100",
      lineHeight: "140%",
      whiteSpace: "nowrap",
    },
  },
});

export const ListItem = styled("li", {
  width: "100%",
  display: "flex",
  gap: "1.25rem",
});

export const ImageContainer = styled("div", {
  width: "6.375rem",
  height: "5.8125rem",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "8px",

  img: {
    height: "100%",
    objectFit: "cover",
  },
});

export const InfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  h2: {
    fontSize: "$lg",
    lineHeight: "160%",
    color: "$gray300",
    whiteSpace: "nowrap",
    fontWeight: 400
  },

  span: {
    fontSize: "$lg",
    lineHeight: "160%",
    color: "$gray100",
    whiteSpace: "nowrap",
    fontWeight: 700
  },

  button: {
    all: "unset",
    fontSize: "$lg",
    lineHeight: "160%",
    color: "$green500",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "color 0.2s",

    "&:hover": {
      color: "$green300",
    },
  },
});
