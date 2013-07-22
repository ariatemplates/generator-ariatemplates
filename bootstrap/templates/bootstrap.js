
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

        <title>My Title</title>

        <!-- load the framework entry point -->
        <script type="text/javascript" src="/aria/ariatemplates-1.4.6.js"></script>
        <script type="text/javascript" src="/aria/css/atskin-1.4.6.js"></script>
</head>
<body>
        <div id='container'></div>
        <script type="text/javascript">
                Aria.loadTemplate({
                        classpath:"<%= templateClass%>",
                        div:"container",
                        moduleCtrl: {classpath:"<%= controllerClass %>"}
                });
        </script>
</body>
</html>
