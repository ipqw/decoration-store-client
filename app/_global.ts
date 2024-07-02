export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export const imageLinkHandler = (link: string) => {
    return link?.slice(0, 4) + "s" + link?.slice(4);
};
