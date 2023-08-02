/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import tw from "twin.macro";
export enum BadgeStatus {
  SUCCESS = "Success",
  WARNING = "Warning",
  DANGER = "Danger",
  BASE = "Base",
}

interface Props {
  title: string;
  status: BadgeStatus;
  className?: string;
}

const useBadgeStyles = () => {
  return {
    badge: (status: BadgeStatus) => css`
      min-width: 100px;

      ${tw`inline-flex justify-center items-center py-x-small px-x-large rounded-small text-small font-semibold`}
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
        : css`${tw`bg-primary-main text-white text-medium`}`}
    `,
  };
};
const TextBadge: FC<Props> = ({ title, status, className }) => {
  const styles = useBadgeStyles();
  return <div css={styles.badge(status)} className={className}>{title}</div>;
};

export default TextBadge;
