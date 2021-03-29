### 简介

本项目是基于Vue，nodejs构建的房产网demo，主要完成了用户登录注册、首页展示、房源信息筛选展示三大模块。

### 浏览网页

1.下载本项目包,使用VS加载本项目，可查看源码。

3.在本项目dist目录下运行`node server.js`（需要安装node.js），进入登录页http://localhost:8000/login.html。

4.登录页：点击左上角“Monta”图标，可直接进入首页；首页可以进行“登录”、“注册”操作，登录后跳转到首页。提供的可用登录账户信息见尾部“附 表1”。

5.首页：中间导航条中的“二手房”可进入“房源信息页”；在首页搜索栏输入信息，也可跳转到“房源信息页”。

6.房源信息展示页：三种方式可以检索房源信息：搜索栏、筛选栏。

**注意：**有房源数据的省份仅限：重庆市、四川省、湖北省，区县数据仅限靠前的4个地区有数据。

附 表1：初始可用的账户信息表：

<table id="userlist"><tr class="tr1"><th>"uid"</th> <th>uemail</th> <th>upw</th> <th>uname</th> <th>uphone</th></tr> <tr><td>0</td><td>970950000@qq.com</td><td>zmj0000</td><td>山抹微云</td><td>13883070000</td></tr><tr><td>1</td><td>970950001@qq.com</td><td>zmj0001</td><td>青衣水袖</td><td>13883070001</td></tr><tr><td>2</td><td>970950002@qq.com</td><td>zmj0002</td><td>风落尘归去</td><td>13883070002</td></tr><tr><td>3</td><td>970950003@qq.com</td><td>zmj0003</td><td>旧约圣经@</td><td>13883070003</td></tr><tr><td>4</td><td>970950004@qq.com</td><td>zmj0004</td><td>本命年</td><td>13883070004</td></tr><tr><td>5</td><td>970950005@qq.com</td><td>zmj0005</td><td>相思劫</td><td>13883070005</td></tr><tr><td>6</td><td>970950006@qq.com</td><td>zmj0006</td><td>ㄣ紫色岁月╬</td><td>13883070006</td></tr><tr><td>7</td><td>970950007@qq.com</td><td>zmj0007</td><td>晨钟暮鼓</td><td>13883070007</td></tr><tr><td>8</td><td>970950008@qq.com</td><td>zmj0008</td><td>待绾之人。</td><td>13883070008</td></tr><tr><td>9</td><td>970950009@qq.com</td><td>zmj0009</td><td>美人独凭栏︶</td><td>13883070009</td></tr><tr><td>10</td><td>970950010@qq.com</td><td>zmj0010</td><td>醉卧雕龙舫 、</td><td>13883070010</td></tr><tr><td>11</td><td>970950011@qq.com</td><td>zmj0011</td><td>┈━═☆浅色、记忆づ</td><td>13883070011</td></tr><tr><td>12</td><td>970950012@qq.com</td><td>zmj0012</td><td>ヤ烟雨夕阳ヤ</td><td>13883070012</td></tr><tr><td>13</td><td>970950013@qq.com</td><td>zmj0013</td><td>右岸亦怜度年华</td><td>13883070013</td></tr><tr><td>14</td><td>970950014@qq.com</td><td>zmj0014</td><td>对此欢终宴</td><td>13883070014</td></tr><tr><td>15</td><td>970950015@qq.com</td><td>zmj0015</td><td>吾皇本是俏佳人</td><td>13883070015</td></tr><tr><td>16</td><td>970950016@qq.com</td><td>zmj0016</td><td>岁月痕迹</td><td>13883070016</td></tr><tr><td>17</td><td>970950017@qq.com</td><td>zmj0017</td><td>眉间意难了</td><td>13883070017</td></tr><tr><td>18</td><td>970950018@qq.com</td><td>zmj0018</td><td>邈姒┮迋孑</td><td>13883070018</td></tr><tr><td>19</td><td>970950019@qq.com</td><td>zmj0019</td><td>末代情人° superf</td><td>13883070019</td></tr><tr><td>20</td><td>970950020@qq.com</td><td>zmj0020</td><td>记忆荏苒成泪 时光辗转成歌</td><td>13883070020</td></tr><tr><td>21</td><td>970950021@qq.com</td><td>zmj0021</td><td>清夜深林觅故人</td><td>13883070021</td></tr><tr><td>22</td><td>970950022@qq.com</td><td>zmj0022</td><td>蓝色幽灵</td><td>13883070022</td></tr><tr><td>23</td><td>970950023@qq.com</td><td>zmj0023</td><td>惊鸿一面</td><td>13883070023</td></tr><tr><td>24</td><td>970950024@qq.com</td><td>zmj0024</td><td>红鸾心动</td><td>13883070024</td></tr><tr><td>25</td><td>970950025@qq.com</td><td>zmj0025</td><td>妃子笑</td><td>13883070025</td></tr><tr><td>26</td><td>970950026@qq.com</td><td>zmj0026</td><td>一世沙场﹌只为你转眸一笑</td><td>13883070026</td></tr><tr><td>27</td><td>970950027@qq.com</td><td>zmj0027</td><td>朗月清风</td><td>13883070027</td></tr><tr><td>28</td><td>970950028@qq.com</td><td>zmj0028</td><td>白衣渡川</td><td>13883070028</td></tr></table>