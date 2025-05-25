
// export const baseUrl = 'https://wedogood.co.il/';
export const baseUrl = 'http://localhost:5195/';
// export const baseUrl = 'https://localhost:7033/';
export const s3Url = "https://dogood-users-photos.ams3.cdn.digitaloceanspaces.com/"
export const s3PublicFilesUrl = "https://dogood-users-photos.ams3.cdn.digitaloceanspaces.com/public/"


export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export function setCookie(name, value, daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieString;
}

export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${document.domain}; SameSite=Lax;`;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
        month: 'long', // only the month name
    });
};