<?php



$loginAdmin = function () use ($app) {
   try {
        $postData = $app->request->post();
        $user_name = $postData['username'];
        $password = $postData['password'];
        $core = Core::getInstance();
        $sql = "SELECT first_name,last_name,user_name,email FROM user_account WHERE user_name=:user_name AND password =:password";
        $stmt = $core->dbh->prepare($sql);
        $stmt->bindParam("user_name", $user_name);
        $stmt->bindParam("password", $password);
        $response = new stdClass();
        $response->user_type = "admin";
        if ($stmt->execute()) {
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response->success = count($records) > 0;
            $response->info = $response->success ? $records[0] : 0;
        } else {
            $response->success = FALSE;
            $response->data = 0;
        }
        echo json_encode($response);
    } catch (Exception $ex) {
       $response->success = FALSE;
       $response->data = $ex->getMessage();
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $ex->getMessage());
    }
};

$addFaculty = function () use ($app) {
    $response = new stdClass();
    try {
        $postData = $app->request->post();
        $first_name = $postData['first_name'];
        $last_name = $postData['last_name'];
        $password = $postData['password'];
        $email = $postData['email_address'];
        $user_name = $postData['user_name'];
        $core = Core::getInstance();
        $facultyExist = isFacultyExist($user_name);
        if ($facultyExist > 0) {
            throw new Exception("Username already Exists", 400);
        }else {
            $sql = "INSERT INTO user_account (first_name,last_name,user_name,email,password)  VALUES (:first_name,:last_name,:user_name,:email,:password)";
            $stmt = $core->dbh->prepare($sql);
            $stmt->bindParam("first_name", $first_name);
            $stmt->bindParam("last_name", $last_name);
            $stmt->bindParam("user_name", $user_name);
            $stmt->bindParam("password", $password);
            $stmt->bindParam("email", $email);

            $response->success = $stmt->execute();
            $response->data = 0;
            echo json_encode($response);
        }
    } catch (Exception $ex) {
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $ex->getMessage());
        // Append response body
        $app->response->write('Bar');

    }
};

function isFacultyExist($user_name){
    $app = \Slim\Slim::getInstance();
    try {
        $core = Core::getInstance();
        $sql = "select user_name from user_account where user_name=:user_name";
        $stmt = $core->dbh->prepare($sql);
        $stmt->bindParam("user_name", $user_name);
        if ($stmt->execute()) {
            return count($stmt->fetchAll(PDO::FETCH_ASSOC));
        } else {
            return false;
        }
    } catch (Exception $ex) {
        $app->response()->status(400);
        $app->response()->header('X-Status-Reason', $ex->getMessage());
    }
}


//For the url http://localhost/OpinionBox/services/index.php/admin/login
$app->post('/admin/login', $loginAdmin);
//For the url http://localhost/OpinionBox/services/index.php/admin/addFaculty
$app->post('/admin/addFaculty', $addFaculty);
?>