import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "myapp_cookiename",
  password: "130rj203r89uaw0seurtf023489u0w8394i12-q09uire1-29ei",
};

export function withIronSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
