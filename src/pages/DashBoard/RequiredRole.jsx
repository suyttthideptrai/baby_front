import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { ROLES } from "../../utils/constant"

const RequiredRole = ({ allowedRoles }) => {
      const role = useSelector(state => state.authentication.role);
    return (
      allowedRoles.includes(role)
      ? <Outlet />
      : <Navigate to="/unauthorized" />
    );
}

export default RequiredRole;

RequiredRole.propTypes = {
      allowedRoles: PropTypes.arrayOf(PropTypes.string)
}

