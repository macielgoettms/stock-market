import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { formatDate } from '../../../utilities/formatters'
import pendingImg from '../images/pending.svg';
import finishedImg from '../images/finished.svg';
import { Button } from 'primereact/button';
import { SkeletonTable } from './SkeletonTable';

export const TaskList = props => {

    const groupHeaderTemplate = (numberOfTasks) => {
        return (
            <div className="p-d-flex p-ai-center">
                <Avatar
                    className="p-overlay-badge p-mx-2"
                    image={props.completedTasks ? finishedImg : pendingImg}
                >
                    {numberOfTasks > 0 && <Badge value={numberOfTasks} severity={props.completedTasks ? "sucess" : "warning"} />}
                </Avatar>
                <p className="p-text-bold">
                    {props.completedTasks ? "Completed Tasks" : "Pending Tasks"}
                </p>
            </div>
        )
    }

    const emptyMessageTemplate = () => {
        return (<p className="p-text-center">No task found</p>)
    }

    const bodyPinnedTemplate = task => {
        return (
            <Button
            icon={task.pinned ? "pi pi-circle-on" : "pi pi-circle-off"}
            className="p-button-rouded p-button-text"
            tooltip={task.pinned ? "Click to unpin this task" : "Click to pin this task"}
            tooltipOptions={{ position: 'right'}}
            onClick={() => props.pinOrUnpinTask(task)}
            />
        )
    }

    const bodyActionTemplate = (task) => {
        return (
            <>
                {task.finished ? (
                    <Button
                        className="p-button-rounded p-button-sucess p-button-text"
                        icon="pi pi-reply"
                        tooltip="Click to uncomplete this task"
                        tooltipOptions={{ position: "left" }}
                        onClick={() => props.uncompleteTask(task)}
                    >

                    </Button>
                ) : (
                    <Button
                        className="p-button-rounded p-button-sucess p-button-text"
                        icon="pi pi-reply"
                        tooltip="Click to finish this task"
                        tooltipOptions={{ position: "left" }}
                        onClick={() => props.completeTask(task)}
                    />
                )}
                <Button
                        className="p-button-rounded p-button-text"
                        icon="pi pi-pencil"
                        tooltip="Click to edit this task"
                        tooltipOptions={{ position: "left" }}
                        onClick={() => props.updateTask(task)}
                />
                <Button
                        className="p-button-rounded p-button-danger p-button-text"
                        icon="pi pi-trash"
                        tooltip="Click to delete this task"
                        tooltipOptions={{ position: "left" }}
                        onClick={event => props.deleteTask(task, event)}
                />
            </>
        )
    }

    if (props.isLoading) {
        return <SkeletonTable />
    }

    return (
        <DataTable
            value={props.tasks}
            autoLayout
            header={groupHeaderTemplate(props.tasks.length)}
            emptyMessage={emptyMessageTemplate}
        >
            <Column
                field="pinned"
                header="Pinned"
                body={bodyPinnedTemplate}
            />
            <Column
                field="dateToFinish"
                header="Finish at"
                body={task => formatDate(task.dateToFinish)}
            />
            <Column
                field="title"
                header="Title"
            />
            <Column
                field="description"
                header="Description"
            />
            <Column
                body={bodyActionTemplate}
                bodyClassName={"p-text-right"}
            />

        </DataTable>
    )
}