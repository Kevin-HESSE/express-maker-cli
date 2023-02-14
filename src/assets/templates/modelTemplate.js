const { Model, Datatypes} = require('sequelize');

class <%= modelName  %> extends Model {}

<%= modelName %>.init({ <% for(const attribute of attributes) { %>
        <%= attribute.attribute %>: { type: Datatypes.<%=attribute.type.toUpperCase() %>,
            allowNull : <%= attribute.allowNull %>
        },<% } %><% if(foreignKey) { for (const key of foreignKey) { %>  <%= key.attribute %>: { type: Datatypes.<%=key.type.toUpperCase() %>,
        allowNull : false,
        references : {
            model : <%= key.referenceModel %>,
            key: '<%= key.referenceAttr %>'
        }
    }, <% } %><% } %>
    }, {
    sequelize,
    modelName: '<%= modelName %>',
    tableName: '<%= options.tableName %>',
    underscored: <%= options.underscored %>,
    timestamps: <%= options.timestamps %>
});

module.exports = <%= modelName %>;

