import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { smsLoginUser } from "../redux/slices/authSlice/action";
import Preloader from "../components/Preloader";

function SmsLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isLoggedIn } = useAppSelector((state) => state.auth);


  const location = useLocation();

  useEffect(() => {
    const smsToken = location.hash.replace("#", "");

    if (smsToken) {
      dispatch(smsLoginUser(smsToken))
        .unwrap()
        .then(() => navigate("/scratch-game"))
        .catch(() => {
          navigate("/login");
        });
    }
  }, [location.hash, dispatch, navigate]);


  return <div className="w-full bg-[#EFE4D2] h-screen">
      {loading && <Preloader />}
      {error && (
        <p className="text-red-500 text-3xl font-semibold">Login Failed</p>
      )}
      {isLoggedIn && <p>Redirecting....</p>}
    </div>
}

export default SmsLogin;
