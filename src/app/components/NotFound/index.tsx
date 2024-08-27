import { Link } from "react-router-dom";
import NotFoundImg from "../../../assets/img/404.jpg";
import Button from "../Button";
import { MdKeyboardBackspace } from "react-icons/md";
import { getUserInfo } from "../../utils/constants";

export const NotFound = () => {
  const userInfo = getUserInfo();
  const Role = userInfo ? userInfo.user.role : null;

  let dashboardLink = "/";

  if (Role) {
    dashboardLink = `/${Role}/dashboard`;
  }

  return (
    <div className="flex flex-col items-center mt-16 justify-center">
      <div className="sm:w-1/2">
        <img src={NotFoundImg} alt="" />
      </div>

      <div>
        <Link to={dashboardLink}>
          <Button icon={<MdKeyboardBackspace size={20} />}>
            <strong>Go Back</strong>
          </Button>
        </Link>
      </div>
    </div>
  );
};
