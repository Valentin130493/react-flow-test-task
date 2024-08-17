import {
    ReactFlow,
    Controls,
    Background,
    addEdge, EdgeChange, applyEdgeChanges, Edge, Connection, applyNodeChanges, NodeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useCallback, useEffect, useState} from "react";

import {Container} from "../../components/ui/Container.tsx";


import {useGraphData} from "../../hooks/useGraphData.ts";

import {useFetchCharacter} from "../../hooks/useFetchCharacter.ts";
import {useNavigate, useParams} from "react-router";
import {usePersonStarships} from "../../hooks/usePersonStarships.ts";

import './index.css'
import {CustomButton} from "../../components/ui/CustomButton.tsx";
import {ROUTES} from "../../routes";

const rfStyle = {
    backgroundColor: '#000',
};
const HeroInfo = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const {selectedPerson, isLoading} = useFetchCharacter(id as string)
    const {starships} = usePersonStarships(Number(id))

    const {nodes, edges} = useGraphData(selectedPerson, starships)

    const [nodesFlow, setNodesFlow] = useState(nodes);
    const [edgesFlow, setEdgesFlow] = useState(edges);

    useEffect(() => {
        setNodesFlow(nodes)
        setEdgesFlow(edges)
    }, [nodes, edges]);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodesFlow(
            (nds) => applyNodeChanges(changes, nds)),
        [nodesFlow]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdgesFlow(
            (eds) => applyEdgeChanges(changes, eds)),
        [edgesFlow]
    )
    const onConnect = useCallback(
        (connection: Edge | Connection) => setEdgesFlow(
            (eds) => addEdge(connection, eds)),
        [edgesFlow]
    );

    const handleBackHome = () => {
        navigate(ROUTES.home);
    }

    if (isLoading) {
        return <Container>
            <div>Data Loading...</div>
        </Container>
    }

    return (
        <div className={'flow_container'}>
            <CustomButton text={"Go Back"} onClick={handleBackHome}/>
            <ReactFlow
                nodes={nodesFlow}
                edges={edgesFlow}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                attributionPosition="top-right"
                fitView
                style={rfStyle}
            >

                <Background gap={16}/>
                <Controls/>
            </ReactFlow>
        </div>
    );
};

export default HeroInfo;