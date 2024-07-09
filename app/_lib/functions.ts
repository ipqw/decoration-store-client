export const imageLinkHandler = (link: string) => {
    return link?.slice(0, 4) + "s" + link?.slice(4);
};
