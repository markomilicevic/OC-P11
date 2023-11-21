import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../features/notifications";
import "./Notifications.css";

const Notifications = () => {
	const notifications = useSelector((state) => state.notifications.list);

	const dispatch = useDispatch();

	useEffect(() => {
		const interval = window.setInterval(() => {
			notifications.forEach((notification) => {
				if (new Date().getTime() >= new Date(notification.expireAt).getTime()) {
					dispatch(close(notification.id));
				}
			});
		}, 1000);

		return () => {
			window.clearInterval(interval);
		};
	}, [notifications, dispatch]);

	if (!notifications.length) {
		return <></>; // Nothing to show
	}

	return (
		<ul className="notifications">
			{notifications.map((notification) => (
				<li onClick={() => dispatch(close(notification.id))} key={notification.id} className={`notification notification-of-type-${notification.type}`}>
					{notification.message}
				</li>
			))}
		</ul>
	);
};

export default Notifications;
