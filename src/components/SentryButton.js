import React from 'react';
import { Button } from 'antd';
import * as Sentry from "@sentry/browser";
import PropTypes from "prop-types";

const SentryButton = ({title, message, tags}) => {
  return (
    <Button
      type="link"
      onClick={() => {
        const eventId = Sentry.captureEvent({
          message,
          tags
        });
        Sentry.showReportDialog({
          eventId: eventId,
          title
        });
      }}
    >
      {title}
    </Button>
  );
};

SentryButton.defaultProps = {
  tags: []
};

SentryButton.propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default SentryButton;