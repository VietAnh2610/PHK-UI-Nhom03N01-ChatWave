export const host = "http://localhost:3001";
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const UpdateUserRoute = `${host}/api/auth/updateUser`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = (from, to) => `${host}/api/messages/getmsg?from=${from}&to=${to}`;

export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const detailUserRoute = `${host}/api/auth/detailUsers`;

export const searchByPhoneRoute = `${host}/api/auth/search-by-phone`;
//Frieds
export const friendRequestsRoute = (userId) => `${host}/api/auth/friendRequests/${userId}`;
export const sendFriendRoute = `${host}/api/auth/sendFriendRequest`;
export const scpFriendRoute = `${host}/api/auth/acceptFriendRequest`;
export const rejectFriendRoute = `${host}/api/auth/rejectFriendRequest`;
export const sendmediaRouter = `${host}/api/messages/uploadMedia`;

export const createGroupRouter = `${host}/api/groups/create`;

// group
export const sendGroupdRoute = `${host}/api/groups/invite`;
export const scpGroupRoute = `${host}/api/groups/accept`;
export const rejectGroupRoute = `${host}/api/groups/decline`;

