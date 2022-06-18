export const abbreviateName = (fullName) => {
  const split_names = fullName.trim().split(" ");
  if (split_names.length > 1) {
    return `${split_names[0].charAt(0)}. ${split_names[1]}`;
  }
  return split_names[0];
};
