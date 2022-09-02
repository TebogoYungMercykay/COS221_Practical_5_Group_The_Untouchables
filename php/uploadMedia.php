<!-- Create a new TABLE named "pictures" with 3 Columns, namely "id(PK),name and img_dir" on the database -->
<!-- 
    The web and local folders are for storing pictures on the repository to be able to load and store them on the database.
    But I do store the images on the database from the minute they are uploaded as well as in the web folder
 -->
<!DOCTYPE html>
<html lang="en">
<!-- 
    Selepe Sello: u20748052
    ref: https://www.youtube.com/watch?v=1NiJcZrPHvA&ab_channel=CleverTechie
 -->

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Media</title>
    <link rel="stylesheet" href="../css/index.css" />
    <script src="https://code.JQuery.com/JQuery-3.4.1.min.js"></script>
    <script src="../js/main.js"></script>
</head>

<body>
    <?php
    $GLOBALS['parent_file'] = 1; //specifies that this file is in the same folder as header.php
    include_once("header.php");
    echo '<div class="main_container">';
    if (isset($_SESSION['user'])) {
        echo '<form action="" method="POST" enctype="multipart/form-data">';
        echo '<input class="frmSub" type="file" name="userfile[]" value="" multiple="">';
        echo '<input class="frmSub" type="submit" name="submit" value="Upload">';
        echo '</form>';
    } else
        echo '<script> loadLoginErr() </script>'
    ?>
<script>
        $('#uploadMediaLink').addClass('active_link') //make navbar element the active link
    </script>

    <?php
    // Used my logins for testing: Please replace with the group details
    $mysqlConnect = new mysqli($_ENV['DBHOST'], $_ENV['DBUSERNAME'], $_ENV['DBPASSWORD']) or die($mysqlConnect->connect_error);
    $mysqlConnect->select_db($_ENV['IMGDBNAME']);
    // Replace Here:
    $dataBaseTable = 'pictures';
    $phpFileUploadErrors = array(
        0 => 'There is mo error, the file was uploaded with success',
        1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
        2 => 'The uploaded file exceets the MAX_FILE_SIZE directive that was specified in the HTML form',
        3 => 'The uploaded file was only partialy uploaded',
        4 => 'No file was uploaded',
        6 => 'Missing a temporary folder',
        7 => 'Failed to write file to disk',
        8 => 'A PHP extension stopped the file upload.',
    );
    if (isset($_FILES['userfile'])) {
        $file_array = reArrayFiles($_FILES['userfile']);
        for ($i = 0; $i < count($file_array); $i++) {
            if ($file_array[$i]['error']) {
    ?><div class="alert alert-danger">
                    <?php echo $file_array[$i]['name'] . ' - ' . $phpFileUploadErrors[$file_array[$i]['error']];
                    ?></div> <?php
                                } else {
                                    $extensions = array('jpg', 'png', 'gif', 'jpeg');
                                    $file_ext = explode('.', $file_array[$i]['name']);
                                    $name = $file_ext[0];
                                    // Removing the "-" in the picture names and also Capitalising the first letter
                                    $name = preg_replace("!-!", " ", $name);
                                    $name = ucwords($name);
                                    $file_ext = end($file_ext);
                                    if (!in_array($file_ext, $extensions)) {
                                    ?><div class="alert alert-danger">
                        <?php echo "{$file_array[$i]['name']} - Invalid file extension!";
                        ?></div> <?php
                                    } else {
                                        $img_dir = 'web/' . $file_array[$i]['name'];
                                        move_uploaded_file($file_array[$i]['tmp_name'], $img_dir);
                                        // Adding data to the database
                                        $sql = "INSERT IGNORE INTO $dataBaseTable (name,img_dir) VALUES('$name','$img_dir')";
                                        $mysqlConnect->query($sql) or die($mysqlConnect->error);
                                        ?>

                    <div class="alert alert-success">
                        <?php $resultPictures = $mysqlConnect->query("SELECT * FROM  $dataBaseTable") or die($mysqlConnect->error);
                                        while ($data =  $resultPictures->fetch_assoc()) {
                                            echo "<h2>{$data['name']}</h2>";
                                            echo "<img src = '{$data['img_dir']}' width ='30%' height ='30%'>";
                                        }
                        ?></div> <?php
                                    }
                                }
                            }
                        }
                        function reArrayFiles(&$file_post)
                        {
                            $file_array = array();
                            $file_count = count($file_post['name']);
                            $file_keys = array_keys($file_post);
                            for ($i = 0; $i < $file_count; $i++) {
                                foreach ($file_keys as $key) {
                                    $file_ary[$i][$key] = $file_post[$key][$i];
                                }
                            }
                            return $file_ary;
                        }
                        function pre_r($array)
                        {
                            echo '<pre>';
                            print_r($array);
                            echo '</pre>';
                        }
