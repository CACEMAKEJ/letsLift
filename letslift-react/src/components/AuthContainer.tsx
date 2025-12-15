import "../styles/auth.css";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthContainer({ title, subtitle, children }: Props) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{title}</h1>
        <p className="auth-subtitle">{subtitle}</p>

        {children}
      </div>
    </div>
  );
}
