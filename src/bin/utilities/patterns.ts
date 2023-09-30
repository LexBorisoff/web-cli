/**
 * prohibits path or query params
 */
export const baseUrlPattern = /^([A-Za-z0-9]+\.)+[a-z]{2,}\/?$/is;

/**
 * allows path and query params
 */
export const urlPattern = /^(https?:\/\/)?([A-Za-z0-9]+\.)+[a-z]{2,}\/?/is;
