import React from "react";
import { Result, Icon, Button, notification } from "antd";
import { Link } from "@reach/router";
import * as Sentry from "@sentry/browser";
import CardContainer from "../components/CardContainer";
import HCenter from "../components/Layouts/HCenter";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, eventId: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  onSubmit(values) {
    notification.success({
      message: "El reporte fue enviado con éxito.",
      description:
        "Tu problema será revisado lo más rápido posible. Cuando se tenga una solución te lo haremos saber."
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <CardContainer>
          <Result
            icon={<Icon type="frown" theme="twoTone" />}
            title="Algo salió mal."
            subTitle="Si gustas puedes reportar el problema o puedes volver a inicio."
            extra={
              <Button
                type="primary"
                onClick={() => {
                  this.setState({ hasError: false });
                }}
              >
                <Link to="/home">Volver a inicio</Link>
              </Button>
            }
          >
            <HCenter>
              <Button
                type="danger"
                ghost
                onClick={() =>
                  Sentry.showReportDialog({
                    eventId: this.state.eventId,
                    title: "Parece que estamos teniendo problemas."
                  })
                }
              >
                Reportar problema
              </Button>
            </HCenter>
          </Result>
        </CardContainer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
