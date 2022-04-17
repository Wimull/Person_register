
import React, {useState} from 'react';
import Styles from "./people-table.module.css"
import { useSort,  HeaderCellSort , } from '@table-library/react-table-library/sort'
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useRowSelect, HeaderCellSelect,CellSelect,SelectTypes,} from '@table-library/react-table-library/select';
import { useTheme } from '@table-library/react-table-library/theme';



export function PeopleTable(props){
  const [search, setSearch] = useState("")
    const data = {nodes: props.data.filter((value) => (
      value.nome?.toLowerCase().includes(search) || value.sobrenome?.toLowerCase().includes(search) ||
      value.nacionalidade?.toLowerCase().includes(search) || value.cep?.toLowerCase().includes(search) ||
      value.estado?.toLowerCase().includes(search) || value.cidade?.toLowerCase().includes(search) ||
      value.logradouro?.toLowerCase().includes(search) || value.email?.toLowerCase().includes(search) ||
      value.telefone?.toLowerCase().includes(search) 
      ))

    }
    const resize = {minWidth: 50}
    const handleSearch = (event) => {
      setSearch(event.target.value);
    };

    const theme = useTheme({
      Table: `
        height: 100%;
      `,
      BaseCell: `     
        &:nth-of-type(1) ,&:nth-of-type(3) ,&:nth-of-type(4) ,&:nth-of-type(6){
          min-width: 50px;
          width: 150px;
      }
      &:nth-of-type(2){
        min-width: 50px;
        width: 175px;
      }
      &:nth-of-type(5){
        min-width: 50px;
        width: 85px;
      }
      &:nth-of-type(7), &:nth-of-type(8), &:nth-of-type(9){
        min-width: 50px;
        width: 200px;
      }
      &:nth-of-type(10){
        min-width: 50px;
        width: 50px;

      }
      `

    });

    const sort = useSort(
      data,
      {
        onChange: onSortChange,
      },
      {
        sortFns: {
          NOME: (array) => array.sort((a, b) => a.nome.localeCompare(b.nome)),
          SOBRENOME: (array) => array.sort((a, b) => a.sobrenome.localeCompare(b.sobrenome)),
          NACIONALIDADE: (array) => array.sort((a, b) => a.nacionalidade.localeCompare(b.nacionalidade)),
          CEP: (array) => array.sort((a, b) => a.cep.localeCompare(b.cep)),
          ESTADO: (array) => array.sort((a, b) => a.estado.localeCompare(b.estado)),
          CIDADE: (array) => array.sort((a, b) => a.cidade.localeCompare(b.cidade)),
          LOGRADOURO: (array) => array.sort((a, b) => a.logradouro.localeCompare(b.logradouro)),
          EMAIL: (array) => array.sort((a, b) => a.email.localeCompare(b.email)),
          TELEFONE: (array) => array.sort((a, b) => a.telefone.localeCompare(b.telefone)),
        },
      },
    );

    function onSortChange(action, state) {
      console.log(action, state);
    }

    const select = useRowSelect(data, {
      onChange: props.onSelectChange,
    },
    {
      rowSelect: SelectTypes.SingleSelect,
      buttonSelect: SelectTypes.SingleSelect,
    });


    return(
      <>
      <div className={Styles.search}>
        <label htmlFor="search">
          <span>Procurar:</span>
          <input type="text" onChange={handleSearch} />
        </label>
      </div>
        <div
        className={Styles.forms}

      >
        <Table data={data} sort={sort} theme={theme}  layout={{ custom: true, horizontalScroll: true }} select={select}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow className={Styles.header}>
                  <HeaderCellSort  resize={resize} sortKey="NOME">Nome</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="SOBRENOME">Sobrenome</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="NACIONALIDADE">Nacionalidade</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="CEP">CEP</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="ESTADO">UF</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="CIDADE"> Cidade</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="LOGRADOURO">Logradouro</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="EMAIL">Email</HeaderCellSort >
                  <HeaderCellSort  resize={resize} sortKey="TELEFONE">Telefone</HeaderCellSort >
                  <HeaderCellSelect />
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item)=>(
                  <Row key={item.id} item={item} className={Styles.row}>
                    <Cell>{item.nome}</Cell>
                    <Cell>{item.sobrenome}</Cell>
                    <Cell>{item.nacionalidade}</Cell>
                    <Cell>{item.cep}</Cell>
                    <Cell>{item.estado}</Cell>
                    <Cell>{item.cidade}</Cell>
                    <Cell>{item.logradouro}</Cell>
                    <Cell>{item.email}</Cell>
                    <Cell>{item.telefone}</Cell>
                    <CellSelect item={item} />
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>
    </>
    )
}