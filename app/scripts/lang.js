angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('es', {"About":"Acerca de","Actions":"Acciones","Active Organisation":"Organización activa","Add":"Agregar","Add Network Interface":"Nueva interfaz de red","Add trigger":"Agregar trigger","Agent ver":"ver. Agente","Agent version":"Versión agente","Alias":"Nombre","Assign Cluster":"Asignar Cluster","Backup":"Respaldo","Booted":"Buteado","Brand":"Marca","CPU":"CPU","CPU / Mainboard":"CPU / Placa","CPU Cap":"CPU Cap","CPU Load":"Carga de CPU","CPU Usage":"Uso de CPU","CPU type":"Tipo de CPU","Capabilities":"Capacidades","Capability":"Capacidad","Category":"categoria","Change":"Cambiar","Change Password":"Cambiar clave","Change to":"Cambiar a","Channels":"Canales","Characteristics":"Características","Charge":"Carga","Cloud":"Nube","Cloud View":"Vision nube","Clusters and VMs":"Clusters y VMs","Console/VNC":"Consola/VNC","Cores":"Núcleos","Cost":"Costo","Create":"Crear","Create a":"Crear una","Create a Snapshot":"Crear un Snapshot","Create a package called":"Crear un paquete que se llame","Created":"Creado","Creator":"Creador","Current package":"Paquete actual","Datasets":"Datasets","Delete":"Borrar","Delete a Snapshot":"Borrar un snapshot","Describe":"Descripción","Description":"Descripción","Destination":"Destino","Details":"Detalles","Disk":"Disco","Disk IOPS":"IO/s disco","Disk Throughput":"Uso disco","Disk usage":"Uso de disco","Distance":"Discantia","Edit":"Editar","Element":"Elemento","Everything":"Todo","FiFo Home":"FiFo Home","Filter":"Filtro","First":"Primero","Force":"Forzar","Form":"Formulario","Free":"Libre","Full Screen":"Pantalla completa","Gateway":"Puerta enlace","Grant":"Autorizar","Grouping":"Agrupación","Groupings":"Agrupaciones","Help":"Ayuda","History":"Historial","Hypervisors":"Hypervisores","ID":"ID","IP":"IP","IP Ranges":"Rangos de IP","Imaging":"Imagen","Import":"Importar","Imported":"Importado","Info":"Info","Information":"Información","Installed":"Instalado","Join":"Unir","Key":"Llave","Key ID":"ID llave","L1 Size":"Tamaño L1","L2 Size":"Tamaño L2","Last":"Ultimo","List Color":"Color","Loading":"Cargando","Logout":"Salir","Machine":"Máquina","Machines":"Máquinas","Main IP":"IP principal","Mainboard":"Placa","Manufacturer":"Fabricante","Memory":"Memoria","Memory Usage":"Uso memoria","Message":"Mensaje","Messages":"Mensajes","Model":"Modelo","More":"Más","My info":"Mi info","Name":"Nombre","Netmask":"Máscara","Network":"Red","Network tags":"Tags de red","Networking":"Red","Networks":"Redes","New Cluster":"Nuevo Cluster","New Machine":"Nueva máquina","New Network":"Nueva Red","New Path":"Nuevo Path","New Role":"Nuevo Rol","New Route":"Nueva Ruta","New Stack":"Nuevo Stack","New Trace":"Nueva traza","New User":"Nuevo usuario","Next":"Siguiente","No clusters in this stack":"No hay clusters en este stack","No ssh keys found on your account. Dont forget to <a href=\"#/configuration/users/{{user.uuid}}\">add one</a>!":"No tienes ninguna llave ssh, no te olvides de <a href='#/configuration/users/{{user.uuid}}'>agregar</a> una!","Node name":"Nombre del nodo","Notes":"Notas","OS":"S.O.","Organization":"Organización","Organizations":"Organizaciones","Owner":"Dueño","Package":"Paquete","Packages":"Paquetes","Passwords":"Claves","Path of server":"Path del servidor","Performance":"Rendimiento","Please identify yourself":"Favor, identifícate","Please import a dataset using the 'Remote datasets' tab.":"Favor importar un dataset desde el tab 'Datasets remotos'","Please select a server to setup its topology":"Selecciona un servidor para configurar su topología","Project FiFo":"Project FiFo","Provisioned":"Provisionado","Published":"Publicado","Range":"Rango de IP","Reboot":"Reiniciar","Remote datasets":"Datasets remotos","Reserved":"Reservado","Reset":"Resetear","Resources":"Recursos","Returned":"Retornados","Role":"Rol","Rollback a Snapshot":"Devolverse al snapshot","Routes":"Rutas","Rules":"Reglas","Run":"Ejecutar","SSH Keys":"Llaves SSH","SSH Keys will be used when creating new KVM machines. They also will dynamically grant access              to SmartOS zones. Based on the console access to the zone.":"Las llaves SSH se usan a momento de crear nuevas máquinas KVM y también para autorizar dinámicamente a las zonas.","SSH keys configured: {{keys}}":"Llaves SSH configuradas: {{keys}}","Save":"Guardar","Save new rules":"Guardar las nuevas reglas","Script":"Script","See":"Ver","Server":"Servidor","Servers":"Servidores","Servers Topology":"Topología servidores","Servers topology":"Topología de servidores","Services":"Servicios","Show disabled services":"Mostrar servicios deshabitados","Size":"Tamaño","SmartOS ver":"Versión SmartOS","Snapshot":"Snapshot","Something is wrong with this machine.":"Hay algo malo con esta máquina","Stacks and Clusters":"Stacks y Clusters","Start":"Iniciar","State":"Estado","Stop":"Detener","Stop the machine to add a new network interface.":"Para agregar una nueva red, detén la máquina.","Swap Usage":"Uso de swap","The Team":"El equipo","There are no additonal rules":"No hay reglas adicionales","Tip: You can <a href=\"https://project-fifo.net/display/PF/LeoFS\">configure</a> Fifo to backup machine's into an S3 compatible service. Then, you will see a 'Versioning' tab on each machine page that lets you work with the backups.":"Tip: Puedes <a href=\"https://project-fifo.net/display/PF/LeoFS\">configurar</a> Fifo para guardar los backups en un service compatible con S3. Esto habilitará el tab 'Versionamiento' en la página de las máquinas.","To rollback, please stop the machine":"Para hacer rollback, detén la máquina","Topology":"Topología","Triggers":"Triggers","Type":"Tipo","UUID":"UUID","Upload a new dataset by selecting a zvol and manifest file":"Sube un nuevo dataset seleccionando un archivo zvol y manifiesto","User":"Usuario","User UUID":"UUID usuario","User script":"Script usuario","Users":"Usuarios","Version":"Versión","Versioning":"Versionamiento","Web Panel":"Panel web","Welcome {{user.name}}!":"Bienvenido {{user.name}}!","You are part of":"Eres parte de","Your cloud is fine!":"Tu nube se ve bien!","Your cloud needs some attention!":"Tu nube necesita ayuda!","ZFS free":"ZFS libre","ZFS size":"Tamaño ZFS","ZFS used":"ZFS usado","Zpool profile":"Perfil Zpool","add":"agregar","called":"llamada","delete":"borrar","machine":"máquina","Config":"Config","Iprange":"rango IP","Org/Group":"Organizaciones y grupos","Versions":"Versiones"," Project-FiFo License":"Licencia","      New IP Range    ":"Nuevo rango de IP","            Parameters          ":"Parámetros","      New Network    ":"Nueva red","      New Organization    ":"Nueva organización","       New Package    ":"Nuevo paquete","              Disks            ":"Discos","Ready":"Listo","Root password":"Clave Root","Admin password":"Clave admin","       New User    ":"Nuevo usuario","You are part of the <u>Acme</u> organization, and of the <u>Powers</u> and <u>Fats</u> role group.":"Eres parte de la organización <u>Acme</u>, y del grupo <u>Powers</u> y <u>Fats</u>.","Servers CPUs":"CPU de los servidores"});
    gettextCatalog.setStrings('zh-CN', {"About":"关于","Actions":"操作列表","Active Organisation":"所属组织","Add":"添加","Add Network Interface":"添加网卡","Add trigger":"添加触发器","Advanced rules":"高级规则","Agent ver":"Agent版本","Agent version":"Agent版本","Alias":"别名","Assign Cluster":"指定集群","Autoboot":"自动启动","Automatic grants on creation":"创建时自动授权","Automatic joins on user creation":"当创建用户时自动加入","Backup":"备份","Booted":"已启动","Brand":"厂标","CPU":"CPU","CPU / Mainboard":"CPU/主板","CPU Cap":"CPU限制","CPU Load":"CPU负载","CPU Usage":"CPU使用率","CPU type":"CPU类型","Capabilities":"能力表","Capability":"容量","Category":"类型","Change":"变更","Change Password":"变更密码","Change to":"变更为","Channels":"频道列表","Characteristics":"特性列表","Charge":"Charge","Cloud":"云","Cloud View":"云视图","Cluster":"集群","Clusters and VMs":"集群与云主机","Configuration":"配置","Console/VNC":"控制台/VNC","Cores":"Cores","Cost":"代价","Create":"创建","Create a":"创建","Create a Snapshot":"创建快照","Create a network for a new IP Range called:":"创建新IP网段，名为","Create a package called":"创建配置包，名为","Created":"已创建","Creator":"创建者","Current package":"当前配置包","DTrace":"DTrace","Dataset":"模板","Datasets":"模板列表","Delete":"删除","Delete a Snapshot":"删除快照","Describe":"描述","Description":"描述","Details":"详细信息","Disk":"磁盘","Disk IOPS":"磁盘 IOPS","Disk Throughput":"磁盘 吞吐量","Disk usage":"磁盘 使用率","Disks":"磁盘","Distance":"距离","Edit":"编辑","Element":"元素","Everything":"全部","FiFo Home":"FiFo项目主页","Filter":"过滤器","First":"起","Force":"强制","Form":"表单","Free":"剩余","Full Screen":"全屏幕","Gateway":"网关","Grant":"授权","Group":"组","Groupings":"组列表","Help":"帮助","History":"历史记录","Hostname":"Hostname","Hypervisors":"Hypervisors","ID":"ID","IP":"IP","IP Ranges":"IP范围","IPv4":"IPv4","Imaging":"制作镜像","Import":"导入","Imported":"已导入","Info":"信息","Information":"信息","Installed":"已安装","Join":"加入","Key":"关键字","Key ID":"关键字ID","L1 ARC":"L1 ARC","L1 Arc hit %":"L1 Arc hit %","L1 Size":"L1 Size","L2 Arc hit %":"L2 Arc hit %","L2 Size":"L2 Size","Last":"止","List Color":"列表颜色","Loading":"载入中","Logout":"登出","Mac":"Mac","Machine":"云主机","Machines":"云主机列表","Main IP":"主IP","Mainboard":"主板","Manufacturer":"制造商","Memory":"内存","Memory Usage":"内存使用率","Message":"消息","Messages":"消息列表","Model":"型号","More":"更多","My info":"我的信息","NIC":"网络适配器","Name":"名字","Netmask":"子网掩码","Network":"网络","Network tags":"网络标记","Networking":"网络","Networks":"网络列表","New Cluster":"新建集群","New IP Range":"新建IP范围","New Machine":"新建云主机","New Network":"新建网络","New Organization":"新建组织","New Package":"新建配置包","New Path":"新建路径","New Role":"新建角色","New Route":"新建路由表","New Stack":"新建堆叠","New Trace":"新建Trace","New User":"新建用户","Next":"下一步","No clusters in this stack":"此堆叠尚不包含任何集群","No ssh keys found on your account. Dont forget to <a href=\"#/configuration/users/{{user.uuid}}\">add one</a>!":"账户中未找到ssh key. 请通过<a href=\"#/configuration/users/{{user.uuid}}\">这里添加</a>!","Node name":"节点名字","Notes":"笔记列表","OS":"操作系统","Org/Role":"组织/角色","Organization":"组织","Organizations":"组织列表","Owner":"拥有者","Package":"配置包","Packages":"配置包列表","Parameters":"参数列表","Passwords":"密码列表","Path of server":"服务器路径","Performance":"性能指标","Permission":"权限","Permissions":"权限列表","Please identify yourself":"请验证身份","Please import a dataset using the 'Remote datasets' tab.":"请先使用'远端Dataset'面板导入一个dataset","Please select a server to setup its topology":"请选择一个服务器以配置其拓扑结构","Pool":"池","Project FiFo":"Project FiFo","Provisioned":"已生成","Published":"已发布","Ram":"内存","Range":"网段","Ranges":"网段列表","Reboot":"重启","Remote datasets":"远端Datasets","Reserved":"已预留","Reset":"重置","Resolver 1":"服务器1","Resolver 2":"服务器2","Resolvers":"DNS解析服务","Resources":"资源列表","Returned":"已返回","Role":"角色","Roles":"角色列表","Rollback a Snapshot":"从快照恢复","Routes":"路由列表","Rules":"规则列表","Run":"运行","SSH Keys":"SSH Keys","SSH Keys will be used when creating new KVM machines. They also will dynamically grant access              to SmartOS zones. Based on the console access to the zone.":"SSH Keys将应用于新创建的KVM云主机. 同时它也用于通过控制台连接所对应的SmartOS zones. ","SSH keys configured: {{keys}}":"已配置SSH keys: {{keys}}","Save":"保存","Save new rules":"另存为新规则","Script":"脚本","See":"查看","Serial":"序列号","Server":"服务器","Servers":"服务器列表","Servers Topology":"服务器拓扑","Servers topology":"服务器拓扑","Services":"服务列表","Show disabled services":"显示已禁用的服务","Showing":"显示中","Size":"大小","SmartOS ver":"SmartOS版本","Snapshot":"快照","Snapshots":"快照列表","Something is wrong with this machine.":"此云主机出现了一些问题.","Stacks & Clusters":"堆叠与集群","Stacks and Clusters":"堆叠与集群","Start":"启动","Status":"状态","Stop":"关机","Stop the machine to add a new network interface.":"要添加新网卡，先关闭此云主机","Storage":"存储","Swap Usage":"Swap使用率","Tag":"标签","Template":"模板","The Team":"项目组","There are no additonal rules":"找不到更多规则","Tip: You can <a href=\"https://project-fifo.net/display/PF/LeoFS\">configure</a> Fifo to backup machine's into an S3 compatible service. Then, you will see a 'Versioning' tab on each machine page that lets you work with the backups.":"小贴士: 你可以通过<a href=\"http://project-fifo.net/display/PF/LeoFS\">配置</a>Fifo, 来备份云主机为S3兼容的服务. 之后, 你将可以在云主机页面中发现“版本”面板, 通过该面板即可以管理备份文件.","To rollback, please stop the machine":"恢复前请先关机","Topology":"拓扑图","Total":"总计","Type":"类型","UUID":"UUID","Used":"已使用","User UUID":"用户UUID","User script":"用户脚本","Users":"用户列表","VLan":"VLan","VM":"云主机","VMs":"云主机列表","Variables":"变量列表","Version":"版本","Versioning":"版本","Virtual Machines":"虚拟主机","Web Panel":"Web面板","Welcome {{user.name}}!":"欢迎, {{user.name}}!","You are part of":"你属于","You roles are":"你的角色是","Your cloud is fine!":"你的云一切正常!","Your cloud needs some attention!":"你的云有问题需要关注!","Yubikeys":"Yubikeys","ZFS free":"ZFS空闲","ZFS size":"ZFS大小","ZFS used":"ZFS已使用","Zoom":"放大","Zpool profile":"Zpool profile","add":"添加","called":"已调用","delete":"删除","here":"此处","machine":"云主机","of":"的"});
    gettextCatalog.setStrings('zh-TW', {"About":"關於","Actions":"操作列表","Active Organisation":"所屬組織","Add":"添加","Add Network Interface":"添加網卡","Add trigger":"添加觸發器","Advanced rules":"高級規則","Agent ver":"Agent版本","Agent version":"Agent版本","Alias":"別名","Assign Cluster":"指定集群","Autoboot":"自動啟動","Automatic grants on creation":"創建時自動授權","Automatic joins on user creation":"當創建用戶時自動加入","Backup":"備份","Booted":"已啟動","Brand":"廠標","CPU":"CPU","CPU / Mainboard":"CPU/主板","CPU Cap":"CPU限制","CPU Load":"CPU負載","CPU Usage":"CPU使用率","CPU type":"CPU類型","Capabilities":"能力表","Capability":"容量","Category":"類型","Change":"變更","Change Password":"變更密碼","Change to":"變更為","Channels":"頻道列表","Characteristics":"特性列表","Charge":"Charge","Cloud":"雲","Cloud View":"雲視圖","Cluster":"集群","Clusters and VMs":"集群與雲主機","Configuration":"配置","Console/VNC":"控制臺/VNC","Cores":"Cores","Cost":"代價","Create":"創建","Create a":"創建","Create a Snapshot":"創建快照","Create a network for a new IP Range called:":"創建新IP網段，名為","Create a package called":"創建配置包，名為","Created":"已創建","Creator":"創建者","Current package":"當前配置包","DTrace":"DTrace","Dataset":"模板","Datasets":"模板列表","Delete":"刪除","Delete a Snapshot":"刪除快照","Describe":"描述","Description":"描述","Details":"詳細信息","Disk":"磁盤","Disk IOPS":"磁盤 IOPS","Disk Throughput":"磁盤 吞吐量","Disk usage":"磁盤 使用率","Disks":"磁盤","Distance":"距離","Edit":"編輯","Element":"元素","Everything":"全部","FiFo Home":"FiFo項目主頁","Filter":"過濾器","First":"起","Force":"強制","Form":"表單","Free":"剩余","Full Screen":"全屏幕","Gateway":"網關","Grant":"授權","Group":"組","Groupings":"組列表","Help":"幫助","History":"歷史記錄","Hostname":"Hostname","Hypervisors":"Hypervisors","ID":"ID","IP":"IP","IP Ranges":"IP範圍","IPv4":"IPv4","Imaging":"制作鏡像","Import":"導入","Imported":"已導入","Info":"信息","Information":"信息","Installed":"已安裝","Join":"加入","Key":"關鍵字","Key ID":"關鍵字ID","L1 ARC":"L1 ARC","L1 Arc hit %":"L1 Arc hit %","L1 Size":"L1 Size","L2 Arc hit %":"L2 Arc hit %","L2 Size":"L2 Size","Last":"止","List Color":"列表顏色","Loading":"載入中","Logout":"登出","Mac":"Mac","Machine":"雲主機","Machines":"雲主機列表","Main IP":"主IP","Mainboard":"主板","Manufacturer":"制造商","Memory":"內存","Memory Usage":"內存使用率","Message":"消息","Messages":"消息列表","Model":"型號","More":"更多","My info":"我的信息","NIC":"網絡適配器","Name":"名字","Netmask":"子網掩碼","Network":"網絡","Network tags":"網絡標記","Networking":"網絡","Networks":"網絡列表","New Cluster":"新建集群","New IP Range":"新建IP範圍","New Machine":"新建雲主機","New Network":"新建網絡","New Organization":"新建組織","New Package":"新建配置包","New Path":"新建路徑","New Role":"新建角色","New Route":"新建路由表","New Stack":"新建堆疊","New Trace":"新建Trace","New User":"新建用戶","Next":"下一步","No clusters in this stack":"此堆疊尚不包含任何集群","No ssh keys found on your account. Dont forget to <a href=\"#/configuration/users/{{user.uuid}}\">add one</a>!":"賬戶中未找到ssh key. 請通過<a href=\"#/configuration/users/{{user.uuid}}\">這裏添加</a>!","Node name":"節點名字","Notes":"筆記列表","OS":"操作系統","Org/Role":"組織/角色","Organization":"組織","Organizations":"組織列表","Owner":"擁有者","Package":"配置包","Packages":"配置包列表","Parameters":"參數列表","Passwords":"密碼列表","Path of server":"服務器路徑","Performance":"性能指標","Permission":"權限","Permissions":"權限列表","Please identify yourself":"請驗證身份","Please import a dataset using the 'Remote datasets' tab.":"請先使用'遠端Dataset'面板導入一個dataset","Please select a server to setup its topology":"請選擇一個服務器以配置其拓撲結構","Pool":"池","Project FiFo":"Project FiFo","Provisioned":"已生成","Published":"已發布","Ram":"內存","Range":"網段","Ranges":"網段列表","Reboot":"重啟","Remote datasets":"遠端Datasets","Reserved":"已預留","Reset":"重置","Resolver 1":"服務器1","Resolver 2":"服務器2","Resolvers":"DNS解析服務","Resources":"資源列表","Returned":"已返回","Role":"角色","Roles":"角色列表","Rollback a Snapshot":"從快照恢復","Routes":"路由列表","Rules":"規則列表","Run":"運行","SSH Keys":"SSH Keys","SSH Keys will be used when creating new KVM machines. They also will dynamically grant access              to SmartOS zones. Based on the console access to the zone.":"SSH Keys將應用於新創建的KVM雲主機. 同時它也用於通過控制臺連接所對應的SmartOS zones. ","SSH keys configured: {{keys}}":"已配置SSH keys: {{keys}}","Save":"保存","Save new rules":"另存為新規則","Script":"腳本","See":"查看","Serial":"序列號","Server":"服務器","Servers":"服務器列表","Servers Topology":"服務器拓撲","Servers topology":"服務器拓撲","Services":"服務列表","Show disabled services":"顯示已禁用的服務","Showing":"顯示中","Size":"大小","SmartOS ver":"SmartOS版本","Snapshot":"快照","Snapshots":"快照列表","Something is wrong with this machine.":"此雲主機出現了一些問題.","Stacks & Clusters":"堆疊與集群","Stacks and Clusters":"堆疊與集群","Start":"啟動","Status":"狀態","Stop":"關機","Stop the machine to add a new network interface.":"要添加新網卡，先關閉此雲主機","Storage":"存儲","Swap Usage":"Swap使用率","Tag":"標簽","Template":"模板","The Team":"項目組","There are no additonal rules":"找不到更多規則","Tip: You can <a href=\"https://project-fifo.net/display/PF/LeoFS\">configure</a> Fifo to backup machine's into an S3 compatible service. Then, you will see a 'Versioning' tab on each machine page that lets you work with the backups.":"小貼士: 你可以通過<a href=\"http://project-fifo.net/display/PF/LeoFS\">配置</a>Fifo, 來備份雲主機為S3兼容的服務. 之後, 你將可以在雲主機頁面中發現“版本”面板, 通過該面板即可以管理備份文件.","To rollback, please stop the machine":"恢復前請先關機","Topology":"拓撲圖","Total":"總計","Type":"類型","UUID":"UUID","Used":"已使用","User UUID":"用戶UUID","User script":"用戶腳本","Users":"用戶列表","VLan":"VLan","VM":"雲主機","VMs":"雲主機列表","Variables":"變量列表","Version":"版本","Versioning":"版本","Virtual Machines":"虛擬主機","Web Panel":"Web面板","Welcome {{user.name}}!":"歡迎, {{user.name}}!","You are part of":"你屬於","You roles are":"你的角色是","Your cloud is fine!":"你的雲一切正常!","Your cloud needs some attention!":"你的雲有問題需要關註!","Yubikeys":"Yubikeys","ZFS free":"ZFS空閑","ZFS size":"ZFS大小","ZFS used":"ZFS已使用","Zoom":"放大","Zpool profile":"Zpool profile","add":"添加","called":"已調用","delete":"刪除","here":"此處","machine":"雲主機","of":"的"});
/* jshint +W100 */
}]);