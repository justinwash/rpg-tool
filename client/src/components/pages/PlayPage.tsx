import React, { createRef, useContext, useEffect, useState } from 'react';
import playArea from '../pixi/playArea';
import useWindowDimensions from '../../utilities/window';
import { parseUrlQuery } from '../../utilities/url';

import OuterSidebar from '../interface/OuterSidebar';
import InnerSidebar from '../interface/InnerSidebar';
import Toolbox from '../interface/Toolbox';

import http from '../../http';
import socket from '../../socket';
import { API_URL } from '../../environment';

import { AuthContext } from '../contexts/AuthProvider';

const PlayPage = (props: {}) => {
  const auth = useContext(AuthContext);
  const canvasRef = createRef<HTMLDivElement>();
  const { sessionId } = parseUrlQuery(window.location.search);

  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (auth?.authState?.rpgToolUser) {
      socket.send(
        JSON.stringify({
          channel: 'register',
          user_id: auth.authState.rpgToolUser.id,
        })
      );
    }
  }, [auth]);

  useEffect(() => {
    if (!sessionId) return;

    http
      .get(`${API_URL}/session/${sessionId}`)
      .then((res) => {
        if (res?.data) {
          setSession(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    canvasRef?.current?.appendChild(playArea.view);
  }, [canvasRef]);

  const { width, height } = useWindowDimensions();
  const outerSidebarWidth = 80;
  const innerSidebarWidth = 400;

  useEffect(() => {
    if (playArea && canvasRef.current) {
      playArea.renderer.resize(width - outerSidebarWidth - innerSidebarWidth, height);
    }
  }, [canvasRef, width, height]);

  return (
    <div style={{ width: '100vw' }} className='Play'>
      <OuterSidebar width={outerSidebarWidth} />
      <InnerSidebar session={session} width={innerSidebarWidth} />
      <Toolbox sidebarWidth={innerSidebarWidth + outerSidebarWidth} />
      <div style={{ overflow: 'auto' }} ref={canvasRef} />
      {session && <span style={{ position: 'fixed', bottom: '8px', right: '8px' }}>Session ID: {session.uuid}</span>}
    </div>
  );
};

export default PlayPage;
