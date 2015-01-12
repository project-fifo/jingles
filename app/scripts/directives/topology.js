'use strict'

angular.module('fifoApp')
    .directive('topology', function () {
        return {
            // templateUrl: '/views/partials/topology.html',
            restrict: 'AE',
            controller: function topologyController($scope) {

                $scope.buildDataTree = function (servers) {

                    //1.- Build the nodes object
                    var nodes = [],
                        nodesById = []

                    if (!servers) return null

                    servers.forEach(function (server) {

                        if (server.path.length == 0) server.path[0] = {
                            "cost": 1,
                            "name": server.uuid
                        }

                        server.path.forEach(function (path) {

                            var node

                            //Its the server
                            if (path.name == server.uuid) {
                                node = server
                                node.cost = path.cost
                                // node.name = path.name        
                                node.isServer = true
                            } else {
                                node = path
                                node.uuid = path.name + path.cost //For the case when same path.name from different hypers have different costs.
                                node.isServer = false
                            }

                            if (nodesById.indexOf(node.uuid) < 0) {
                                nodes.push(node)
                                nodesById.push(node.uuid)
                            }

                        })
                    })
					
					if (!nodes.length) return //if there are no nodes, exit

                    //2.- Get the links between them
                    var connections = [],
                        connectionsById = {}

                    servers.forEach(function (server) {
                        var lastPath = null
                        server.path.forEach(function (path) {

                            if (lastPath !== null) {
                                //dont repeate link.
                                // var connectionId = lastPath.name + lastPath.cost + path.name + path.cost
                                var connectionId = lastPath.name + path.name
                                if (!connectionsById[connectionId]) {
                                    connections.push({
                                        target: path.isServer === false ? path.name + path.cost : path.name,
                                        source: lastPath.isServer === false ? lastPath.name + lastPath.cost : lastPath.name
                                    })
                                    connectionsById[connectionId] = true
                                }
                            }

                            lastPath = path

                        })
                    })

                    //3.- Transform the connection in 'links' (nodes index)
                    var links = connections.map(function (con) {
                        return {
                            source: nodesById.indexOf(con.source),
                            target: nodesById.indexOf(con.target)
                        }
                    })

                    //4.- Copy into new list


                    var fifo = {
                        uuid: "0",
                        alias: "FiFo",
                        children: []
                    }

                    var drawableNodes = []

                    for (var index = 0; index < nodes.length; ++index) {
                        var drawableNode = {
                            uuid: nodes[index].uuid,
                            alias: nodes[index].alias,
                            name: nodes[index].name,
                            nodeRef: nodes[index],
                            isServer: nodes[index].isServer
                        }
                        drawableNodes[index] = drawableNode
                    }


                    links.forEach(function (d) {
                        drawableNodes[d.target].parent = drawableNodes[d.source].uuid
                    })

                    for (var index = 0; index < drawableNodes.length; ++index) {
                    	if (!drawableNodes[index].parent) drawableNodes[index].parent = "__root"

                    }

                    var drawableNodeById = []
                    drawableNodes.forEach(function (d) {
                        drawableNodeById[d.uuid] = d
                    })

                    var drawableNodeByParent = []
                    drawableNodes.forEach(function (d) {
                    	if (drawableNodeByParent[d.parent])
                        	drawableNodeByParent[d.parent].linkedChildren.push(d)
                    	else
                    		drawableNodeByParent[d.parent] = {linkedChildren: [d]}
                    })

                    drawableNodeByParent["__root"].linkedChildren.forEach(function(d){

                    	 function formTree(r) {
                    	 		if(drawableNodeByParent[r.uuid] ){  //if the current r is a parent
                    	 			drawableNodeByParent[r.uuid].linkedChildren.forEach(formTree) //call form tree for each linkedchildren
                    	 		} 

                    	 		if (r.parent == "__root"){ //if parent is fifo escape
									fifo.children.push(r)
									return
                    	 		} 

                    	 		if(drawableNodeById[r.parent].children) // add current node to children of parent
                    	 			drawableNodeById[r.parent].children.push(r)
                    	 		else
                    	 			drawableNodeById[r.parent].children = [r]


						  }
						  formTree(d)
                    }) 

                    return fifo

                }

                $scope.paintNodes = function (data) {


                    // Sooo lazy... 
                    $scope.svg.selectAll(".link").remove()
                    $scope.svg.selectAll(".node").remove()


                    var nodes = $scope.cluster.nodes(data),
                        links = $scope.cluster.links(nodes)

                    $scope.svg.selectAll(".link")
                        .data(links)
                        .enter().append("path")
                        .attr("class", "link")
                        .attr("d", $scope.diagonal)

                    var node = $scope.svg.selectAll(".node")
                        .data(nodes)
                        .enter().append("g")
                        .attr("class", function (d) {
                            return d.isServer ? "node clickable" : "node clickable link"
                        })
                        .attr("transform", function (d) {
                            return "translate(" + d.y + "," + d.x + ")"
                        })

                    node.append("circle")
                        .attr("r", function(d) { return d.isServer ? 6.5 : 4.5 })
                        .attr("class", function (d) {
                            return d.isServer ? "server" : "link"
                        })

                    node.append("text")
                        .attr("dx", function (d) {
                            return d.children ? 0 : 8
                        })
                        .attr("dy", function (d) {
                            return d.children ? 20 : 0
                        }) 
                        .style("text-anchor", function (d) {
                            return d.isServer ? "start" : "middle"
                        })
                        .text(function (d) {
                            return d.alias ? d.alias : d.name
                        })

                    node.on('click', $scope.onNodeClick)

                },

                $scope.onNodeClick = function (node) {

                    $scope.centerNode(node)

                    if (node.nodeRef && node.nodeRef.isServer) {
                        $scope.$apply(function () {
                            $scope.selected = node.nodeRef
                        })
                    } else {
                        $scope.$apply(function () {
                            $scope.selected = null
                        })
                    }
          
                },

                $scope.centerNode = function centerNode(source) {

                    var x, y, scale

                    y = -source.x
                    x = -source.y
                    scale = 1.1 //$scope.zoomListener.scale()

                    // Because the layout is horizontal X and Y axis are switched	
                    x = -source.x * scale + $scope.viewerHeight / 2
                    y = -source.y * scale + $scope.viewerWidth / 2

                    $scope.moveCanvas({duration: 750, scale: 1.1, position: [y,x]})

                },

                $scope.moveCanvas = function(opts) {

                    var scale = opts.scale || 1,
                        position = opts.position || [100, 100],
                        duration = opts.duration || 0


                    d3.select("g").transition()
                        .duration(duration)
                        .attr("transform", "translate(" + position[0] + "," + position[1] + ")scale(" + scale + ")")

                    $scope.zoomListener.scale(scale)
                    $scope.zoomListener.translate(position)
                }

            },

            scope: {
                servers: '=',
                selected: '='
            },


            link: function postLink(scope, element, attrs) {

                scope.viewerWidth = 500
                scope.viewerHeight = 500

                var margin = 100

                // Because the layout is horizontal X and Y axis are switched
                scope.cluster = d3.layout.cluster()
                    .size([scope.viewerHeight, scope.viewerWidth])
                    .separation(function (a, b) {
                        return (a.parent == b.parent ? 1 : 2) / a.depth
                    })

                scope.diagonal = d3.svg.diagonal().projection(function (d) {
                    return [d.y, d.x]
                })

                scope.zoomListener = d3.behavior.zoom().scaleExtent([.5, 2]).on("zoom", function () {

                    var t = [],
                        s = d3.event.scale,
                        ty = d3.event.translate[0],
                        tx = d3.event.translate[1]

                    //Dont allow the graph to pan more than 85% off the display area
                    t[0] = Math.min(scope.viewerWidth * .85 * s, Math.max(scope.viewerWidth * -.85 * s, ty))
                    t[1] = Math.min(scope.viewerHeight * .85 * s, Math.max(scope.viewerHeight * -.85 * s, tx))

                    scope.moveCanvas({scale: d3.event.scale, position: t})
                })

                //Set image props
                scope.svg = d3.select('#' + attrs.id).append("svg")
                    .attr("width", scope.viewerWidth + margin * 2)
                    .attr("height", scope.viewerHeight + margin * 2)
                    .call(scope.zoomListener)
                    .attr("class", "drawarea")
                    .append("svg:g")
                d3.select(".drawarea").call(scope.zoomListener)


                //Wire it up

                //First time wait for the servers data.
                scope.servers.$promise.then(function (servers) {
                    scope.treeData = scope.buildDataTree(servers)
                })

                //Update when the user changes the path of the hyper
                scope.$watch('selected', function (val) {
                    scope.treeData = scope.buildDataTree(scope.servers)
                }, true)


                //When treeData changes, paint the nodes.
                scope.$watch('treeData', function (val) {
                    if (!val) return
                    scope.paintNodes(val)
                })


                //Give the graph some breathing room
                d3.select("g").attr("transform", "translate(" + margin + "," + margin + ")")
                scope.zoomListener.translate([margin, margin])

            }
        }
    })