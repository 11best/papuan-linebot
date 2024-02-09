export const carBubble = {
  type: "flex",
  altText: "this is a flex message",
  contents: {
    type: "bubble",
    hero: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "hello, world",
          margin: "lg",
          size: "lg",
          weight: "bold",
          align: "center",
        },
      ],
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          style: "link",
          height: "sm",
          action: {
            type: "message",
            label: "Honda",
            text: "Honda",
          },
        },
        {
          type: "button",
          style: "link",
          height: "sm",
          action: {
            type: "message",
            label: "Toyota",
            text: "Toyota",
          },
        },
        {
          type: "button",
          style: "link",
          height: "sm",
          action: {
            type: "message",
            label: "Mazda",
            text: "Mazda",
          },
        },
      ],
    },
    styles: {
      hero: {
        separator: true,
      },
    },
  },
};
