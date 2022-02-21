export interface ILoginMessage {
  name: string;
  text: string;
}

export const LoginErrorMessages: ILoginMessage[] = [
  {
    name: "invalid_credentials",
    text: "The credentials you have enterend are invalid.",
  },
  {
    name: "user_not_found",
    text: "No user was found, please register following <Link href='/auth/register'>this link<Link>.",
  },
  {
    name: "login_to_view_wishlist",
    text: "You have to be logged in to view or edit your wishlist.",
  },
  {
    name: "login_to_view_account",
    text: "You have to be logged in to view or edit your account details.",
  },
  {
    name: "login_to_view_orders",
    text: "You have to be logged in to view or edit your orders.",
  },
  {
    name: "login_to_place_order",
    text: "You have to be logged in to place a new order.",
  },
  {
    name: "account_deleted",
    text: "Account successfully deleted.",
  },
  {
    name: "username_taken",
    text: "The username you entered is already taken.",
  },
  {
    name: "email_exists",
    text: "An account already exists with this email address.",
  },
];
