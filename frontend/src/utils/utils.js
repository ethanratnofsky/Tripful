export const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = phoneNumberString.replace(/\D/g, "");

    if (cleaned.length < 4) return null;

    const match = cleaned.match(/(\d{3})(\d{1,3})?(\d{1,4})?$/);

    if (match)
        return `(${match[1]})${match[2] !== undefined ? ` ${match[2]}` : ""}${
            match[3] !== undefined ? `-${match[3]}` : ""
        }`;

    return null;
};
