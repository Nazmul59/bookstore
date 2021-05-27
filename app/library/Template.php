<?php 
    // created At: 26 May 2021
    // created By: Nazmul Hasan, Email: < nazmul.cse2019@gmail.com >
    // phone: 01616216703

    namespace App\Library;
    use View;
     class Template 
     {
         public static function loadview($pageName, $data = array()){
            
            if (\Request::ajax()) {
                return view($pageName, $data);
            } else {
                $data["page_name"] = View::make($pageName, $data)->render();
                return view("admin.layouts.master", $data);
            }
         }
     }
     

?>