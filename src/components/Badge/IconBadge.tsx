/** @jsxImportSource @emotion/react */
import { FC, ReactNode } from "react";
import { BadgeStatus } from "./TextBadge";
import { css } from "@emotion/react";
import tw from "twin.macro";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  icon: ReactNode;
  status: BadgeStatus;
}

const useBadgeStyles = () => {
  return {
    badge: (status: BadgeStatus) => css`
      min-width: 35px;
      height: 35px;
      ${tw`inline-flex items-center justify-center py-x-small px-small rounded-small`}
      ${status === BadgeStatus.SUCCESS
        ? css`
            ${tw`bg-green-light text-green-main`};
          `
        : status === BadgeStatus.WARNING
        ? css`
            ${tw`bg-secondary-light text-secondary-dark`};
          `
        : status === BadgeStatus.DANGER
        ? css`
            ${tw`bg-red-light text-red-main`};
          `
        : css`${tw`bg-primary-light text-primary-main`}`}
    `,
  };
};
const IconBadge: FC<Props> = ({ icon, status }) => {
  const styles = useBadgeStyles();
  return (
    <div css={styles.badge(status)}>
      {icon}
    </div>
  );
};

export default IconBadge;
