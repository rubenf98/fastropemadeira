import React, { useState } from 'react'
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  button{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: ${props => props.active ? "40px" : "170px"};
    height: 40px;
    line-height: 1;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    background: rgb(52,60,94);
    color: white;
    border-radius: 40px;
    cursor: pointer;
    overflow: hidden;
    transition: all .35s;
    border: ${props => props.active ? "3px solid rgb(52,60,94)" : "none"};

    &:hover{
      background: white;
      color: rgb(52,60,94);
      border: 3px solid rgb(52,60,94);
    }

    span {
      opacity: ${props => props.active ? 0 : 1};
      visibility:  ${props => props.active ? "hidden" : "visible"};
      transition: all .35s;
    }

    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      border-radius: 50%;
      z-index: 1;
      transition: all .35s;
      opacity: ${props => props.active ? 1 : 0};
      visibility:  ${props => props.active ? "visible" : "hidden"};

      svg {
        width: 20px;
        height: 20px;
        fill: rgb(52,60,94);
 
        margin-top: ${props => props.active ? "50%" : "0px"};
        transform: ${props => props.active ? "translateY(-50%) rotate(720deg) scale(1)" : "translateY(-50%) rotate(0deg) scale(0)"};
        transition: all .35s;
      }
    }
  }     
`;

function SubmitButton({ active }) {


  return (
    <Container active={active}>
      <button>
        <span>Submit</span>
        <div className="success">
          <svg xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 29.756 29.756" xmlSpace="preserve" >
            <path d="M29.049,5.009L28.19,4.151c-0.943-0.945-2.488-0.945-3.434,0L10.172,18.737l-5.175-5.173   c-0.943-0.944-2.489-0.944-3.432,0.001l-0.858,0.857c-0.943,0.944-0.943,2.489,0,3.433l7.744,7.752   c0.944,0.943,2.489,0.943,3.433,0L29.049,8.442C29.991,7.498,29.991,5.953,29.049,5.009z" />
          </svg>
        </div>
      </button>
    </Container>
  )
}

export default SubmitButton
