import { RoutesEnum } from "@/enums";
import { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { StarIcon } from "@/assets/icons";

type UserLinkProps = { className?: string; user: any; withRating?: boolean };

export const UserLink: FC<UserLinkProps> = ({ className, user, withRating = true }) => {
  if (user)
    return (
      <Link to={RoutesEnum.PROFILE.replace(":id", user.id)} className={cn("text-green600 inline-flex gap-1", className)}>
        {user.name}{" "}
        {withRating && (
          <span className='flex gap-1'>
            <StarIcon />
            {user.rate}
          </span>
        )}
      </Link>
    );
};
