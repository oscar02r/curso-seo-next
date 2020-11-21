import { useState } from "react";
import { useRouter } from "next/router";
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

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
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
                  style={{ cursor: "pointer" }}
                  onClick={() => signout(() => router.replace(`/signin`))}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
            {isAuth() &&
              isAuth().role === 0 &&
                (
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
  );
};

export default Header;
