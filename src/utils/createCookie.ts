export const createCookie = (tokenData: { token: any; expiresIn: any }) => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
}
