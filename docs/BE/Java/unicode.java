public class Test{
public static void main(String[] args){
try
{
System.out.println(java.net.URLDecoder.decode("java+url%B1%E0%C2%EB%D7%AA%BB%BB","gb2312"));
}
catch (Exception e)
{
e.printStackTrace();
}
}
}