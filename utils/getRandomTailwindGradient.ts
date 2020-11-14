const getRandomTailwindGradient = () => {
  const combinations = ["teal:blue", "red:yellow", "red:orange", "green:teal"];
  const [color1, color2] = combinations[
    Math.floor(Math.random() * combinations.length)
  ].split(":");

  return `bg-gradient-to-br from-${color1}-500 to-${color2}-500`;
};

export default getRandomTailwindGradient;
