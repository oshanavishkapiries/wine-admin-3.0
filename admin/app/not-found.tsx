const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex max-w-md flex-col items-center text-center">
        <h1 className="text-[150px] font-bold leading-none">404</h1>

        <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>

        <p className="mb-8 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. Perhaps you've
          mistyped the URL or the page has been moved.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-muted/50 to-transparent" />
    </div>
  );
};

export default NotFoundPage;
