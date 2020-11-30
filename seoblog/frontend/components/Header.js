import { useState } from "react";
import { useRouter, Router } from "next/router";
import NProgress from "nprogress";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { isAuth, signout } from "../actions/auth";
import { APP_NAME } from "../config";
import Search from '../components/blog/Search'

//Load barprogress
Router.events.on("routeChangeStart", (url) => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          
              <>
                <NavItem>
                  <Link href="/blogs">
                    <NavLink>Blogs</NavLink>
                  </Link>
                </NavItem>
              </>
          
            {!isAuth() && (
              <>
                <NavItem>
                  <Link href="/signin">
                    <NavLink>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink
                  //style={{ cursor: "pointer" }}
                  onClick={() => signout(() => router.replace(`/signin`))}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    <Search/>
    </>
  );
};

export default Header;
